import { createServer } from './server'

export const main = (argc, argv, env) => {
  console.log(argc, argv, env);

  const app = createServer();

  app.listen(3000);
};

export default main;
