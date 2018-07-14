import http from 'http';

export const createServer = () => http.createServer((req, res) => {
  res.end('Hi');
});
