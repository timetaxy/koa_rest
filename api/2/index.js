const Router = require('koa-router');
const route2 = new Router();
const ctrl = require('./api.controller');
// const handler = (ctx, next) => {
//   ctx.body = `${ctx.request.method} ${ctx.request.path}`
// }
// route2.get('/',handler)
// route2.post('/',handler)
// route2.delete('/',handler)
// route2.put('/',handler)
// route2.patch('/',handler)
route2.get('/', ctrl.list);
route2.post('/', ctrl.create);
route2.delete('/', ctrl.delete);
route2.put('/', ctrl.replace);
route2.patch('/', ctrl.update);
module.exports = route2;