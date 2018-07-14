import { listDatabases, addUser } from '../mongo';

export const routes = {
  '/': {
    get(req, res) { res.json({ status: 200, statusMessage: 'Ok', response: 'Hello, World!'}) },
  },
  '/admin/dbs/list': {
    get(req, res) {
      listDatabases()
        .then((data) => res.json(data))
        .catch((err) => {
          console.error(err);
          res.status(500).json({ status: 500, statusMessage: 'Server Error', response: 'Failed' });
        });
    }
  },
  '/users': {
    post(req, res) {
      if (!req.body) {
        res.status(400).json({ status: 400, statusMessage: 'Bad Request', response: 'Missing request body' });
      } else {
        console.log(req.body);
        if (req.body.birthDate) { req.body.birthDate = new Date(req.body.birthDate); }
        addUser(req.body)
          .then(() => {
            res.json({ status: 200, statusMessage: 'Ok', response: 'Added user', user: req.body });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ status: 500, statusMessage: 'Server Error', response: 'Failed' });
          });
      }
    }
  }
};

export default routes;
