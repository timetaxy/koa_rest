const Router = require('koa-router');
const api = new Router();
const router2 = require('./2');
const authRouter = require('./auth');
api.use('/2', router2.routes());
api.use('/auth', authRouter.routes());
// api.get('/', (ctx, next) => {
//   ctx.body = 'GET' + ctx.request.path;
// })
module.exports = api;
