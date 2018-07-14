import { createServer } from './server'

export const main = (argc, argv, env) => {
  console.log(argc, argv, env);
  const server = createServer();
  server.listen(3000);
};

export default main;
