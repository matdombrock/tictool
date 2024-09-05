# TicTool
A collection of utilities for the [TIC-80](https://tic80.com) fantasy console. 

## CLI
```
___________.__     ___________           .__   
\__    ___/|__| ___\__    ___/___   ____ |  |  
  |    |   |  |/ ___\|    | /  _ \ /  _ \|  |  
  |    |   |  \  \___|    |(  |_| |  |_| )  |__
  |____|   |__|\___  >____| \____/ \____/|____/
                   \/                                     
            
Usage: cli [options] [command]

TicTool CLI for TIC-80
GPL3 - Mathieu Dombrock (Replicat)

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  update          Update the downloads and meta data
  surf            Browse the local files in TIC-80
  play <id>       Play the local file with the given ID in TIC-80
  web <id>        Open the game with the given ID in your web browser
  search <query>  Search the downloads and meta data
  script <lang>   List files written in the given (programming) language
  id <id>         List files with the given ID
  author <name>   List files with the given author name
  analytics       Show a meta analysis of files
  help [command]  display help for command
```