import * as fs from 'fs';
import * as ChildProcess from "child_process";

const { Command } = require('commander');

import Analytics from "./Analytics";
import Update from "./Update";
import Search, { SearchResult, SearchOptions } from "./Search";
import cfg from "./cfg";
import Util from "./Util";
import { CartMeta } from "./types";

class CLI {
    private program = new Command();
    private metaRaw = Util.readFile(cfg.recDir + cfg.metaFile);
    private meta = JSON.parse(this.metaRaw) as CartMeta[];
    constructor() {
        console.log(`
___________.__     ___________           .__   
\\__    ___/|__| ___\\__    ___/___   ____ |  |  
  |    |   |  |/ ___\\|    | /  _ \\ /  _ \\|  |  
  |    |   |  \\  \\___|    |(  |_| |  |_| )  |__
  |____|   |__|\\___  >____| \\____/ \\____/|____/
                   \\/                                     
            `);
        this.program
            .name('cli')
            .version('1.0.0')
            .description('TicTool CLI for TIC-80\nGPL3 - Mathieu Dombrock (Replicat)');

        this.program
            .command('update')
            .description('Update the downloads and meta data')
            .action((name: string) => {
                this.update();
            });

        this.program
            .command('surf')
            .description('Browse the local files in TIC-80')
            .action(() => {
                this.surf();
            });

        this.program
            .command('play <id>')
            .description('Play the local file with the given ID in TIC-80')
            .action((id: string) => {
                this.play(id);
            });

        this.program
            .command('web <id>')
            .description('Open the game with the given ID in your web browser')
            .action((id: string) => {
                this.openWeb(id);
            });

        this.program
            .command('search <query>')
            .option('-s, --script <lang>', 'Filter for the given language')
            .option('-c, --section <section>', 'Filter for the given section/category')
            .description('Search the downloads and meta data')
            .action((query: string, options: SearchOptions) => {
                Search.search(this.meta, query, options, true);
            });

        this.program
            .command('script <lang>')
            .description('List files written in the given (programming) language')
            .action((query: string) => {
                Search.script(this.meta, query, true);
            });

        this.program
            .command('id <id>')
            .description('Show file with the given ID')
            .action((query: string) => {
                Search.id(this.meta, query, true);
            });

        this.program
            .command('author <name>')
            .description('List files with the given author name')
            .action((query: string) => {
                Search.author(this.meta, query, true);
            });
            
        this.program
            .command('random')
            .description('Play a random game')
            .action(() => {
                this.random();
            });

        this.program
            .command('max-id')
            .description('Calculate the maximum id')
            .action(() => {
                console.log('Max ID: ' + Analytics.maxID(this.meta));
            });

        this.program
            .command('analytics')
            .description('Show a meta analysis of files')
            .action(() => {
                this.analytics();
            });
    };
    private play(id: string): void {
        const res: SearchResult = Search.id(this.meta, id)[0];
        const start = 'tic80 --fs=' + cfg.dlDir + res.cartMeta.section + ' --cmd="load ' + res.cartMeta.filename + ' & run"';
        console.log(start);
        ChildProcess.exec(start);
    }
    private random(): void {
        const id = Math.floor(Math.random() * Analytics.maxID(this.meta));
        console.log('Random ID: ' + id);
        this.play(id.toString());
    }
    private surf(): void {
        const start = 'tic80 --fs=' + cfg.dlDir + ' --cmd=surf';
        console.log(start);
        ChildProcess.exec(start);
    }
    private analytics(): void {
        const ana = Analytics.analyze(this.meta);
        console.log('Overall language usage:');
        console.log(ana.langs);
        console.log();
        console.log('Language usage by section:');
        console.log(JSON.stringify(ana.sectionLangs, null, 2));
        console.log();
        console.log('Section counts:');
        console.log(ana.sections);
        console.log();
        console.log('Cart count: ', ana.cartCount);
        console.log('Total cart size: ');
        console.log(ana.totalSize + ' bytes');
        console.log('Average cart size: ');
        console.log((ana.totalSize / ana.cartCount).toFixed(0) + ' bytes');
    }
    private openWeb(id: string): void {
        const url = 'https://tic80.com/play?cart=' + id;
        const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
        ChildProcess.exec(start + ' ' + url);
    }
    private async update(): Promise<void> {
        const mn = new Update();
        // await mn.getListings();
        await mn.getCarts();
        mn.generateMeta();
        const ana = Analytics.analyze(this.meta);
        fs.writeFileSync(cfg.recDir + cfg.anaFile, JSON.stringify(ana, null, 2));
        console.log('Found ' + mn.newCarts + ' new carts!');
    }
    run(): void {
        this.program.parse(process.argv);
    }
}

new CLI().run();