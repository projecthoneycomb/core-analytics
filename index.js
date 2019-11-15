const CubejsServer = require('@cubejs-backend/server');

const config = {
  checkAuth: (req, res, next) => {
    return next && next();
  }
}

const server = new CubejsServer(config);

server.listen().then(({ port }) => {
  console.log(`🚀 Cube.js server is listening on ${port}`);
}).catch(e => {
  console.error('Fatal error during server start: ');
  console.error(e.stack || e);
});
