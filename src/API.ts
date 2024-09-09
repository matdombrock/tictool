
// import path from 'path';
import express, { Request, Response } from 'express';

import Search, { SearchOptions } from './Search';

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
  const result = Search.search(query, opts);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
