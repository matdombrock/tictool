import { CartMeta } from "./types";
import Util from "./Util";
import cfg from "./cfg";

type Count = { [key: string]: number };
type DeepCount = { [key: string]: Count }

type Analysis = {
    langs: Count;
    authors: Count;
    sections: Count;
    sectionLangs: DeepCount;
    cartCount: number;
    totalSize: number;
}
class Analytics {
    static metaRaw = Util.readFile(cfg.recDir + cfg.metaFile);
    static meta = JSON.parse(this.metaRaw) as CartMeta[];
    static analyze(): Analysis {
        let ana: Analysis = {
            langs: {},
            authors: {},
            sections: {},
            sectionLangs: {},
            cartCount: 0,
            totalSize: 0
        };
        for (let item of this.meta) {
            if (ana.langs[item.script]) ana.langs[item.script]++;
            else ana.langs[item.script] = 1;
            if (ana.authors[item.author]) ana.authors[item.author]++;
            else ana.authors[item.author] = 1;
            if (ana.sections[item.section]) ana.sections[item.section]++;
            else ana.sections[item.section] = 1;
            if (!ana.sectionLangs[item.section]) ana.sectionLangs[item.section] = {};
            if (ana.sectionLangs[item.section][item.script]) ana.sectionLangs[item.section][item.script]++;
            else ana.sectionLangs[item.section][item.script] = 1;
            // if (item.section === "Games") {
            ana.totalSize += item.size;
            ana.cartCount++;
            // }   
        }
        return ana;
    }
    static maxID(): number {
        let res = 0;
        for (let item of this.meta) {
            res = item.id > res ? item.id : res;
        }
        return res;
    }
}

export default Analytics;