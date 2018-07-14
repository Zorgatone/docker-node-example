import express from 'express';
import methodOverride from 'method-override';
import morgan from 'morgan';

import httpLogger from './loggers/http-logger';
import routes from './routes';

export const createServer = () => {
  const app = express();

  app.use(methodOverride());
  app.use(express.urlencoded());
  app.use(express.json());

  // CORS middleware
  const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'CONNECT,DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT,TRACE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
      res.send(200);
    } else {
      next();
    }
  };

  app.use(allowCrossDomain);

  const logger = httpLogger();

  app.use(morgan('combined', { stream: logger.stream }));

  Object
    .keys(routes)
    .forEach((routeName) => (
      Object
        .keys(routes[routeName])
        .forEach((method) => {
          app[method].call(app, routeName, routes[routeName][method]);
        })
    ));

  // app.get('/', (req, res) => { res.json({ status: 200, statusMessage: '200 Ok', response: 'Hello, World!'}) });
  // app.get('/admin/dbs/list', (req, res) => {
  //   listDatabases()
  //     .then((data) => res.json(data))
  //     .catch((err) => {
  //       console.error(err);
  //       res.end('fail');
  //     });
  // });

  return app;
};
