import { CartMeta } from "./types";
import TTUtil from "./TTUtil";
import cfg from "./cfg";

type Count = {[key:string]: number};

class TTAnalytics {
    static metaRaw = TTUtil.readFile(cfg.recDir + cfg.metaFile);
    static meta = JSON.parse(this.metaRaw) as CartMeta[];
    static analyze() {
        let langs: Count = {};
        let authors: Count = {};
        for (let item of this.meta){
            if (langs[item.script]) langs[item.script]++;
            else langs[item.script] = 1;
            if (authors[item.author]) authors[item.author]++;
            else authors[item.author] = 1;
        }
        console.log('Overall language usage:');
        console.log(langs);
        // console.log('Authors:');
        // console.log(JSON.stringify(authors, null, 2));
    }
}

export default TTAnalytics;