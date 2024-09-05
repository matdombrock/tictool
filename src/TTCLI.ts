import * as ChildProcess from "child_process";

const { Command } = require('commander');

import TTAnalytics from "./TTAnalytics";
import TTUpdate from "./TTUpdate";
import TTSearch, { SearchResult } from "./TTSearch";
import cfg from "./cfg";


class TTCLI {
    private program = new Command();
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
            .description('Search the downloads and meta data')
            .action((query: string) => {
              TTSearch.search(query, true);
            });
        
        this.program
            .command('script <lang>')
            .description('List files written in the given (programming) language')
            .action((query: string) => {
              TTSearch.script(query, true);
            });
        
        this.program
            .command('id <id>')
            .description('List files with the given ID')
            .action((query: string) => {
              TTSearch.id(query, true);
            });
        
        this.program
            .command('author <name>')
            .description('List files with the given author name')
            .action((query: string) => {
              TTSearch.author(query, true);
            }); 
        
        this.program
            .command('analytics')
            .description('Show a meta analysis of files')
            .action(() => {
              TTAnalytics.analyze();
            });
    };
    private play(id: string): void {
        const res: SearchResult = TTSearch.id(id)[0];
        const start = 'tic80 --fs=' + cfg.dlDir + res.cartMeta.section + ' --cmd="load ' + res.cartMeta.filename + ' & run"';
        console.log(start);
        ChildProcess.exec(start); 
    }
    private surf(): void {
        const start = 'tic80 --fs=' + cfg.dlDir + ' --cmd=surf';
        console.log(start);
        ChildProcess.exec(start); 
    }
    private openWeb(id: string): void {
        const url = 'https://tic80.com/play?cart=' + id;
        const start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
        ChildProcess.exec(start + ' ' + url);
    }
    private async update(): Promise<void> {
        const mn = new TTUpdate();
        // await mn.getListings();
        await mn.getCarts();
        mn.generateMeta();
    }
    run(): void {
        this.program.parse(process.argv);
    }    
}

new TTCLI().run();