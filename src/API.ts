
// import path from 'path';
import express, { Request, Response } from 'express';

import Search, { SearchOptions } from './Search';
import { CartMeta } from './types';
import cfg from './cfg';
import Util from './Util';

const metaRaw = Util.readFile(cfg.recDir + cfg.metaFile);
const meta = JSON.parse(metaRaw) as CartMeta[];

const app = express();
const port = 3000;

app.use('/ui', express.static('webui'));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/search', (req: Request, res: Response) => {
  const query = req.query.query as string || '';
  const script = req.query.script as string || ''; 
  const section = req.query.section as string || '';  
  const opts: SearchOptions = {script, section};
  const result = Search.search(meta, query, opts);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
