import { CartMeta } from "./types";
import TTUtil from "./TTUtil";
import cfg from "./cfg";

export type SearchResult = {
    cartMeta: CartMeta;
    points: number;
};

class TTSearch {
    static metaRaw = TTUtil.readFile(cfg.recDir + cfg.metaFile);
    static meta = JSON.parse(this.metaRaw) as CartMeta[];
    static print(res: SearchResult[]): void {
        for (let item of res) {
            console.log();
            console.log(item.cartMeta.name.replace('.tic', ''));
            console.log('--- Author: ', item.cartMeta.author);
            console.log('--- Desc: ', item.cartMeta.desc);
            console.log('--- Section: ', item.cartMeta.section);
            console.log('--- Script: ', item.cartMeta.script);
            console.log('--- File name: ', item.cartMeta.filename);
            console.log('--- ID: ', item.cartMeta.id);
        }
        console.log();
        console.log('Found: ', res.length);
    }
    static id(query: string, print: boolean = false): SearchResult[] {
        let res: SearchResult[] = [];
        for (let item of this.meta){
            if(item.id.toString() === query) {
                res.push({cartMeta: item, points: 5});
            }
        } 
        if (print) this.print(res);
        return res;
    }
    static author(query: string, print: boolean = false): SearchResult[] {
        let res: SearchResult[] = [];
        for (let item of this.meta){
            if (item.author.includes(query.toLowerCase()) || query.includes(item.author.toLowerCase())) {
                res.push({cartMeta: item, points: 5});
            }
        } 
        if (print) this.print(res);
        return res;
    }
    static script(query: string, print: boolean = false): SearchResult[] {
        let res: SearchResult[] = [];
        for (let item of this.meta){
            let points = 0;
            if (item.script.includes(query.toLowerCase()) || query.includes(item.script.toLowerCase())) {
                points += 5;
            }
            if (points) {
                res.push({cartMeta: item, points: points});
            }
        }
        if (print) this.print(res);
        return res;
    }
    static search(query: string, print: boolean = false): SearchResult[]  {
        let res: SearchResult[] = [];
        for (let item of this.meta){
            let points = 0;
            query = query.toLowerCase();
            if (item.name.includes(query) || query.includes(item.name.toLowerCase())) {
                points += 5;
            }
            if (item.filename.includes(query) || query.includes(item.filename.toLowerCase())) {
                points += 5;
            }
            if (item.desc.includes(query) || query.includes(item.desc.toLowerCase())) {
                points += 5;
            }
            if (item.author.includes(query) || query.includes(item.author.toLowerCase())) {
                points += 5;
            }
            if (item.script.includes(query) || query.includes(item.script.toLowerCase())) {
                points += 5;
            }
            if (points) {
                res.push({cartMeta: item, points: points});
            }
        }
        if (print) this.print(res);
        return res;
    }
}
export default TTSearch;