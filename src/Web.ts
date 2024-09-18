import Search, { SearchOptions, SearchResult } from "./Search";
import Analytics from "./Analytics";
import { CartMeta } from "./types";

import * as meta from "../records/meta.json";

const resElement = document.getElementById('results') as HTMLElement;
const resCountElement = document.getElementById('resultsCount') as HTMLElement;

const queryElement = document.getElementById('query') as HTMLInputElement;
const scriptElement = document.getElementById('script') as HTMLSelectElement;
const sectionElement = document.getElementById('section') as HTMLSelectElement;

const aboutBtn = document.getElementById('aboutBtn') as HTMLButtonElement;
const analyticsBtn = document.getElementById('analyticsBtn') as HTMLButtonElement;
const randomBtn = document.getElementById('randomBtn') as HTMLButtonElement;
const bookmarksBtn = document.getElementById('bookmarksBtn') as HTMLButtonElement;
const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;

const checkLimit = document.getElementById('checkLimit') as HTMLInputElement;
const checkJSON = document.getElementById('checkJSON') as HTMLInputElement;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onInput(_e: Event): void {
    // const target = e.target as HTMLInputElement;
    search(queryElement.value, scriptElement.value, sectionElement.value);
}
function onAbout(): void {
    resCountElement.innerHTML = '';
    let html = '<h3>Overview</h3>';
    html += 'TicTool - Search is a tool for searching the TIC80 cart catalog powered by the TicTool CLI.<br/>';
    html += 'Cart downloads come from TIC80.com. <br/>';
    html += '<br/>';
    resElement.innerHTML = html;
}
function onAnalytics(): void {
    resCountElement.innerHTML = '';
    const ana = Analytics.analyze(meta as CartMeta[]);
    let html = '<h3>Overall language usage:</h3>';
    for (const [key, val] of Object.entries(ana.langs)) {
        html += `${key}: ${val} <br/>`;
    }
    html += '<h3>Carts by section:</h3>';
    for (const [key, val] of Object.entries(ana.langs)) {
        html += `${key}: ${val} <br/>`;
    }
    html += '<h3>Languages by section:</h3>';
    for (const [section, data] of Object.entries(ana.sectionLangs)) {
        html += `${section}:<br/>`;
        for (const [key, val] of Object.entries(data)) {
            html += `-- ${key}: ${val} <br/>`; 
        }
    }
    html += '<h3>Authors by cart count:</h3>';
    for (const [key, val] of Object.entries(ana.authors)) {
        html += `${key}: ${val} <br/>`;
    }
    // html += '<pre>' + JSON.stringify(ana, null, 2) + '</pre>';
    resElement.innerHTML = html;
}
function onRandom(): void {
    resCountElement.innerHTML = '';
    resElement.innerHTML = 'random coming soon';
}
function onBookmarks(): void {
    resCountElement.innerHTML = '';
    resElement.innerHTML = 'bookmarks coming soon';
}

function search(query: string, script: string, section: string) {
    const opts: SearchOptions = { script: script, section: section };
    const res: SearchResult[] = Search.search(meta as CartMeta[], query, opts);
    const limited = (checkLimit.checked && res.length > 64);
    if (limited) res.length = 64;
    if (resElement) {
        resElement.innerHTML = 'Searching...';
        resCountElement.innerHTML = '<div>' + res.length + ' results ' + (limited ? ' (limited)' : '') + '</div><br/>';
        let html = '';
        if (checkJSON.checked) {
            html += '<pre>';
            for (const item of res) {
                html += JSON.stringify(item.cartMeta, null, 2);
                html += '\n';
            }
            html += '</pre>';
            resElement.innerHTML = html;
            return;
        }
        for (const item of res) {
            const metaId = `metaBtn-${item.cartMeta.id}`;
            const markId = `markBtn-${item.cartMeta.id}`;
            const desc = item.cartMeta.desc !== 'unknown' ? item.cartMeta.desc : 'No description provided...';
            const author = item.cartMeta.author !== 'unknown' ? item.cartMeta.author : 'unknown author';
            html += '<div class="listing-item">';
            html += `<img class="cover-img" src="covers/${item.cartMeta.id}_${item.cartMeta.filename}.gif">`;
            html += '<div class="listing-title">';
            html += `${item.cartMeta.name.replace('.tic', '')}`;
            html += '</div>';
            html += '<div class="listing-info">';
            html += `${item.cartMeta.section} - ${author} -  ${item.cartMeta.script} - #${item.cartMeta.id}`;
            html += '</div>';
            html += '<div class="listing-desc">';
            html += desc;
            html += '</div>';
            html += '<hr/>';
            html += '<div>';
            html += `<a href="https://tic80.com/play?cart=${item.cartMeta.id}" target="_blank"><button>//PLAY</button></a>`;
            html += `<a href="https://tic80.com/cart/${item.cartMeta.hash}/${item.cartMeta.filename}" target="_blank"><button>//DOWNLOAD</button></a>`;
            html += `<button id="${markId}">//BOOKMARK</button>`;
            html += `<button id="${metaId}">//META</button>`;
            html += '</div>'
            html += '</div>';
        }
        // html += '<pre>' + JSON.stringify(res, null, 2) + '</pre>'
        resElement.innerHTML = html;
        // Must register listeners after content is rendered
        for (const item of res) {
            const metaId = `metaBtn-${item.cartMeta.id}`;
            const markId = `markBtn-${item.cartMeta.id}`;
            document.getElementById(metaId)?.addEventListener('click', ()=>{
                alert(JSON.stringify(item, null, 2));
            });
            document.getElementById(markId)?.addEventListener('click', () => {
                alert('Added ' + item.cartMeta.name + ' to bookmarks!');
            });
        }
    }
}

addEventListener('load', () => {
    // search('','','');
    onAbout();
});

queryElement.value = '';
scriptElement.value = '';
sectionElement.value = '';
checkJSON.checked = false;
checkLimit.checked = true;
// queryElement.addEventListener('input', onInput);
// queryElement.addEventListener('change', onInput);
// scriptElement.addEventListener('input', onInput);
// sectionElement.addEventListener('input', onInput);
searchBtn.addEventListener('click', onInput);

aboutBtn.addEventListener('click', onAbout);
analyticsBtn.addEventListener('click', onAnalytics);
randomBtn.addEventListener('click', onRandom);
bookmarksBtn.addEventListener('click', onBookmarks);

