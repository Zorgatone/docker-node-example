import mongodb from 'mongodb';
import util from 'util';
import fs from 'fs';

const { MongoClient } = mongodb;

const url = 'mongodb://mongo:27017';
const connect = util.promisify(MongoClient.connect);
const readFile = util.promisify(fs.readFile);

export const listDatabases = () => {
  return connect(url)
    .then((client) => {
      const db = client.db('test');
      const admin = db.admin();
      const listDatabases = util.promisify(admin.listDatabases.bind(admin));
      return listDatabases();
    });
};

export const exampleData = () => {
  return connect(url)
    .then((client) => {
      return readFile('static/schemas/user.schema.json')
        .then((data) => {
          const json = JSON.parse(data);
          console.log(json);
          const db = client.db('test');
          const createCollection = util.promisify(db.createCollection.bind(db));
          return createCollection('users', {
            validator: {
              $jsonSchema: json
            }
          })
        })
    });
};

export const addUser = (user) => {
  console.log(user);
  return connect(url)
    .then((client) => {
      const collection = client.db('test').collection('users');
      const save = util.promisify(collection.save.bind(collection));
      return save(user);
    });
};
