import fs from 'fs';

import Util from './Util';
import cfg from './cfg';

import { Section, CartData, CartDataRaw, CartMeta, DLRecord } from './types';

class Update {
    private records: DLRecord = {};
    public newCarts = 0;
    constructor() {
        Util.mkdir(cfg.recDir);
        const recString = Util.readFile(cfg.recDir + cfg.recFile);
        if (recString) {
            this.records = JSON.parse(recString) as DLRecord;
            console.log('Loaded records...');
        }
    }
    // Returns true if we dont already have the cart
    private checkDL(cartData: CartData): boolean {
        const target = this.records[cartData.id];
        if (!target) {
            console.log('Check DL: No target in records - ', cartData.id);
            return true;
        }
        if (target.filename !== cartData.filename) {
            console.log('Check DL: New filename - ', cartData.filename);
            return true;
        }
        if (target.name !== cartData.name) {
            console.log('Check DL: New name - ', cartData.name);
            return true;
        }
        if (target.section !== cartData.section) {
            console.log('Check DL: New section - ', cartData.name);
            return true;
        }
        if (target.hash !== cartData.hash) {
            console.log('Check DL: New hash - ', cartData.name);
            return true;
        }
        if (!fs.existsSync(cfg.dlDir + '/' + cartData.section + '/' + cartData.filename)) {
            console.log('Check DL: Cant find dl - ', cartData.name);
            return true;
        }
        return false;
    }
    private recDL(cartData: CartData): void {
        this.records[cartData.id] = cartData;
        fs.writeFileSync(cfg.recDir + cfg.recFile, JSON.stringify(this.records, null, 2));
    }
    private readListing(section: Section): CartDataRaw[] {
        const file = Util.readFile(cfg.listingDir + section + '.json');
        if (!file || file === '') throw new Error('Cant read listing');
        const parsed = JSON.parse(file);
        console.log(typeof JSON.parse(file));
        if (!parsed || !parsed.files) throw new Error('Cant parse listing');
        return parsed.files as CartDataRaw[];
    }
    async getListings(): Promise<void> {
        Util.mkdir(cfg.listingDir);
        for (let section of cfg.listingSections) {
            const url = cfg.apiUrl + 'json?fn=dir&path=Play/' + section;
            const outputPath = cfg.listingDir + section + '.json';
            await Util.downloadFile(url, outputPath, false, true);
        }
        fs.writeFileSync(cfg.listingDir + '/_timestamp', Date.now().toString());
    }
    async getCarts(): Promise<void> {
        for (let section of cfg.listingSections as Section[]) {
            const listing = this.readListing(section);
            let i = 0;
            for (let cart of listing as CartDataRaw[]){
                i++;
                console.log('--- ', i, '/', listing.length);
                const cd: CartData = {
                    name: cart.name,
                    section: section,
                    hash: cart.hash,
                    filename: cart.filename,
                    id: cart.id
                }
                const dir = cfg.dlDir + cd.section;
                Util.mkdir(dir);
                if (this.checkDL(cd)) {
                    const url = cfg.apiUrl + 'cart/' + cd.hash + '/' + cd.filename;
                    console.log('Downloading cart: ', cd.name);
                    await Util.downloadFile(url, dir + '/' + cd.filename, true, false);
                    this.recDL(cd);
                    this.newCarts++;
                }
                else {
                    console.log('Cart exists: ' + cd.name);
                }
            }
        }
    }
    generateMeta(): void {
        console.log('Generating meta...');
        let meta: CartMeta[] = [];
        for (let section of cfg.listingSections) {
            const sectionPath = cfg.dlDir + section;
            console.log(sectionPath);
            if (!fs.existsSync(sectionPath)) {
                throw new Error('Cant find downloads for ' + section);   
            }
            const files = fs.readdirSync(sectionPath);
            for (let file of files) {
                if (file === '.local') continue;
                console.log();
                console.log('Section: ', file);
                let rec: CartData = {
                    name: 'null',
                    section: 'Games',
                    hash: 'null',
                    id: -1,
                    filename: 'null'
                };
                for (let record of Object.values(this.records)) {
                    if (record.filename === file) rec = record;
                }
                if (rec === null) {
                    throw new Error('Cant find dl record for ' + file);
                }
                const contents = Util.readFile(sectionPath + '/' + file);
                const stats = fs.statSync(sectionPath + '/' + file);
                // Split the file contents into an array of lines
                const lines = contents.split('\n');
                let cartMeta: CartMeta = {
                    name: rec.name,
                    author: 'unknown',
                    script: 'lua',// lua is the default script
                    desc: 'unknown',
                    id: rec.id,
                    section: rec.section,
                    hash: rec.hash,
                    filename: rec.filename,
                    size: stats.size,
                    mtime: stats.mtime,
                    ctime: stats.ctime
                };
                for (let line of lines) {
                    line = line.toLowerCase();
                    if (line.includes('script:')) {
                        if (line.includes('lua')) cartMeta.script = 'lua';
                        if (line.includes('ruby')) cartMeta.script = 'ruby';
                        if (line.includes('js')) cartMeta.script = 'js';
                        if (line.includes('moon')) cartMeta.script = 'moon';
                        if (line.includes('fennel')) cartMeta.script = 'fennel';
                        if (line.includes('squirrel')) cartMeta.script = 'squirrel';
                        if (line.includes('wren')) cartMeta.script = 'wren';
                        if (line.includes('wasm')) cartMeta.script = 'wasm';
                        if (line.includes('janet')) cartMeta.script = 'janet';
                        if (line.includes('scheme')) cartMeta.script = 'scheme';
                        if (line.includes('python')) cartMeta.script = 'python';   
                    }
                    if (line.includes('author:')) {
                        cartMeta.author = line.split('author:')[1].split(/\r?\n|\r/)[0].trim() || cartMeta.author;       
                    }
                    if (line.includes('desc:')) {
                        cartMeta.desc = line.split('desc:')[1].split(/\r?\n|\r/)[0].trim() || cartMeta.desc;       
                    }
                }
                console.log(cartMeta);
                meta.push(cartMeta);
            }
        }
        fs.writeFileSync(cfg.recDir + '/' + cfg.metaFile, JSON.stringify(meta, null, 2));
        console.log('Wrote metadata for ' + meta.length + ' carts!');
    }
}

export default Update;

