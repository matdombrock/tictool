# TicTool
A collection of utilities for the [TIC-80](https://tic80.com) fantasy console. 

## Cart Catalog (Licensing)
**This repo contains most (if not all) TIC-80 carts which have been uploaded to [TIC-80.com](https://tic80.com). The authors of these carts have not given permission to redistribute these carts. These are here for research/indexing purposes only. Please visit [TIC-80.com](https://tic80.com) to download the carts from their original source.** 

## Usage
Update the system (carts, covers meta-data etc.):
```
npm run cli update
```

Run the web-ui:
```
npm run web
```

## Tech Stack
- Typescript
- NodeJS
- Webpack

## Directories
### `./download`
Contains the downloaded carts (`.tic`) split by section.

### `./listing`
Contains the raw listing data pulled from TIC80.com.

### `./records`
Contains download records and generated meta-data. 

### `./src`
Contains the Typescript source files.

### `./webui`
Contains the web UI static content files.

## FAQ
### Why does this repo contain TIC80 carts?
The carts are provided for research purposes only. Their function here is for generating metadata and launching the carts locally. 

### Can you remove my cart?
Yes of course. Create an issue or get in touch with my in some other way and I will add your cart to the block list. 

### Does this create a load on TIC80.com?
Not really. This tool is careful to avoid doing that. 
- Carts provided here (so you don't have to download them)
- Running `update` only downloads *new/updates* carts
- Cover images are served locally
- Searching does not hit the tic80.com API at all

### How is the web UI generated?
- Grab/cache listing data from API
- Download the carts according to listing data (if we find a new cart or updated hash)
- Parse the carts for extra metadata and cache the results
- Use the cached data files to power the static search web UI.