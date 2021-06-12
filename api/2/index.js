const Router = require('koa-router')
const route2 = new Router()
const handler = (ctx, next) => {
  ctx.body = `${ctx.request.method} ${ctx.request.path}`
}
route2.get('/',handler)
route2.post('/',handler)
route2.delete('/',handler)
route2.put('/',handler)
route2.patch('/',handler)
module.exports = route2;