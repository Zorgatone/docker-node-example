import http from 'http';

import { listDatabases } from './mongo';

export const createServer = () => http.createServer((req, res) => {
  listDatabases()
    .then((data) => res.end(data))
    .catch((err) => {
      console.error(err);
      res.end('fail');
    });
});
