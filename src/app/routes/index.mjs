import { listDatabases } from '../mongo';

export const routes = {
  '/': {
    'get': (req, res) => { res.json({ status: 200, statusMessage: '200 Ok', response: 'Hello, World!'}) },
  },
  '/admin/dbs/list': {
    'get': (req, res) => {
      listDatabases()
        .then((data) => res.json(data))
        .catch((err) => {
          console.error(err);
          res.end('fail');
        });
    }
  }
};

export default routes;
