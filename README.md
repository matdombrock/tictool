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
### Does this create a load on TIC80.com?