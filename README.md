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

## Search Example:
```
% npm run cli search 8-bit

8-bit-shogi
--- Author:  deidara and sasori
--- Desc:  Shogi: a japanese chess variant. Play against your friend or face the AI. (guide built-in) NO WARRANTY!
--- Section:  Games
--- Script:  js
--- File name:  8_bit_shogi.tic
--- ID:  2999

8-bit_soccer_world-cup
--- Author:  deidara
--- Desc:  soccer game. NO WARRANTY!
--- Section:  Games
--- Script:  js
--- File name:  8_bit_soccer_world_cup.tic
--- ID:  2940

Uncharted Dungeon
--- Author:  Pedro G. H. Andrade
--- Desc:  8-bit rpg game.
--- Section:  Games
--- Script:  lua
--- File name:  uncharted_dungeon.tic
--- ID:  2863

5-bit square wave &amp; 8-bit square wave - Sound Test
--- Author:  masternama
--- Desc:  Simple an wavefroms octave trick
--- Section:  Tech
--- Script:  lua
--- File name:  5_bit_square_wave_8_bit_square_wave_sound_test.tic
--- ID:  963

psychedemoica
--- Author:  catpants
--- Desc:  8-bit psychedelica
--- Section:  Tech
--- Script:  lua
--- File name:  psychedemoica.tic
--- ID:  255

hsv8
--- Author:  anescient
--- Desc:  8-bit HSV to RGB function
--- Section:  Tools
--- Script:  lua
--- File name:  hsv8.tic
--- ID:  3973

Music Demo (8-bit mod)
--- Author:  Tromino (mod by RS)
--- Desc:  music made with custom waveforms
--- Section:  Music
--- Script:  lua
--- File name:  music_demo_8_bit_mod.tic
--- ID:  1386

half-life 2 8-bit
--- Author:  hanamileh
--- Desc:  version 0.1
--- Section:  WIP
--- Script:  lua
--- File name:  half_life_2_8_bit.tic
--- ID:  1219

Panda Bro
--- Author:  trelemar, Fubuki, StinkerB06
--- Desc:  Hack of a Hack of a Remake (feat. 8-bit Panda player)
--- Section:  WIP
--- Script:  unknown
--- File name:  panda_bro.tic
--- ID:  604

Found:  9
```

## Analytics Example
```js
% npm run cli analytics

Overall language usage:
{
  lua: 2955,
  js: 201,
  unknown: 319,
  fennel: 47,
  wren: 21,
  moon: 56,
  janet: 3,
  squirrel: 7,
  python: 20,
  scheme: 1,
  wasm: 5,
  ruby: 4
}
```