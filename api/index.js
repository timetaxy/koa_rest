const Router = require('koa-router');
const api = new Router();
const router2 = require('./2');
api.use('/2', router2.routes());
// api.get('/', (ctx, next) => {
//   ctx.body = 'GET' + ctx.request.path;
// })
module.exports = api;