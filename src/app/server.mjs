import express from 'express';

import { listDatabases } from './mongo';

export const createServer = () => {
  const app = express();

  app.get('/', (req, res) => { res.end('Hello, World!') });
  app.get('/admin/dbs/list', (req, res) => {
    listDatabases()
      .then((data) => res.end(data))
      .catch((err) => {
        console.error(err);
        res.end('fail');
      });
  });

  return app;
};
