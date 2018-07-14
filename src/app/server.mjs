import express from 'express';
import methodOverride from 'method-override';

import { listDatabases } from './mongo';

export const createServer = () => {
  const app = express();

  app.get('/', (req, res) => { res.json({ status: 200, statusMessage: '200 Ok', response: 'Hello, World!'}) });
  app.get('/admin/dbs/list', (req, res) => {
    listDatabases()
      .then((data) => res.json(data))
      .catch((err) => {
        console.error(err);
        res.end('fail');
      });
  });

  app.use(methodOverride());
  app.use(express.urlencoded());
  app.use(express.json());

  // CORS middleware
  const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'CONNECT,DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT,TRACE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    } else {
      next();
    }
  };

  app.use(allowCrossDomain);

  return app;
};
