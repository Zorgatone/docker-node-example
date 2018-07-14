import { createServer } from './server'

import { exampleData } from './mongo.mjs'

export const main = (argc, argv, env) => {
  console.log(argc, argv, env);

  const app = createServer();

  exampleData().then(() => console.log('ok')).catch(console.error);

  app.listen(3000);
};

export default main;
