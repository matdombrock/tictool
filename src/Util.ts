import fs from 'fs';
import * as fsp from 'fs/promises';
import path from 'path';

import axios from 'axios';
import { jsonrepair } from 'jsonrepair';

class Util {
    constructor(){};
    static mkdir(dir: string): void {
        if (!fs.existsSync(dir)) {
            console.log('mkdir: ', dir);
            fs.mkdirSync(dir, { recursive: true });
        }
    }
    static readFile(path: string): string {
        if (fs.existsSync(path)) return fs.readFileSync(path, 'utf-8');
        else return '';
    }
    static repairJSONString(json: string): string {
        try {
            const repaired = jsonrepair(json)
            return repaired;
        } catch (err) {
            throw new Error('Cant repair JSON!');            
        }
    }
    static async downloadFile(url: string, outputPath: string, raw: boolean = false, repairJSON: boolean = false): Promise<void> {
        try {
            let response;
            if (raw) {
                response = await axios.get(url, {
                    responseType: 'arraybuffer'  // This is the key change
                });
            }
            else {
                response = await axios.get(url);
            }
            let resData = response.data;
            if (repairJSON) {
                resData = this.repairJSONString(resData);
            }
            await fsp.writeFile(path.resolve(outputPath), resData);
            console.log(`File file successfully downloaded and saved to ${outputPath}`);
        }
        catch (error) {
            console.error('An error occurred:', error);
            throw new Error('Can not repair JSON from ' + url);
        }
    }
}

export default Util;