import mongodb from 'mongodb';
import util from 'util';

const { MongoClient } = mongodb;

const url = 'mongodb://mongo:27017';
const connect = util.promisify(MongoClient.connect);

export const listDatabases = () => {
  return connect(url).then((client) => {
    const db = client.db('test');
    const admin = db.admin();
    const listDatabases = util.promisify(admin.listDatabases.bind(admin));
    return listDatabases()
      .then((res) => Array.isArray(res && res.databases) ? res.databases.map((el) => el.name).join('\n') : '');
  });
};
