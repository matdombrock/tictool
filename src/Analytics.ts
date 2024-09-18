import { CartMeta } from "./types";
import cfg from "./cfg";

type Count = { [key: string]: number };
type DeepCount = { [key: string]: Count }

export type Analysis = {
    langs: Count;
    authors: Count;
    sections: Count;
    sectionLangs: DeepCount;
    cartCount: number;
    totalSize: number;
}
class Analytics {
    private static sortObjectByValue(obj: object) {
        // Convert object to array of [key, value] pairs
        const entries = Object.entries(obj);
        // Sort the array based on values (second element of each pair)
        entries.sort((a, b) => b[1] - a[1]);
        // Convert sorted array back to an object
        return Object.fromEntries(entries);
    }
    static analyze(meta: CartMeta[]): Analysis {
        const ana: Analysis = {
            langs: {},
            authors: {},
            sections: {},
            sectionLangs: {},
            cartCount: 0,
            totalSize: 0
        };
        for (const item of meta) {
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
        ana.langs = this.sortObjectByValue(ana.langs);
        ana.authors = this.sortObjectByValue(ana.authors);
        ana.sections = this.sortObjectByValue(ana.authors);
        for (const section of cfg.listingSections) {
            ana.sectionLangs[section] = this.sortObjectByValue(ana.sectionLangs[section]);
        }

        return ana;
    }
    static maxID(meta: CartMeta[]): number {
        let res = 0;
        for (const item of meta) {
            res = item.id > res ? item.id : res;
        }
        return res;
    }
}

export default Analytics;