export type Section = 'Games' | 'Tech' | 'Tools' | 'Music' | 'WIP' | 'Demoscene' | 'Livecoding';

export type CartData = {
    name: string;
    section: Section;
    hash: string;
    id: number;
    filename: string;
};

export type CartDataRaw = {
    name: string;
    hash: string;
    id: number;
    filename: string;
};

export type CartMeta = {
    name: string;
    author: string;
    script: string;
    desc: string;
    section: string;
    hash: string;
    id: number;
    filename: string;
    size: number;
    mtime: string;
    ctime: string;
};

export type DLRecord = {
    [key: number]: {
        cartData: CartData;
        ts: number;
    }
};