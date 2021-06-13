const Koa = require('koa');
const koaBody = require('koa-body');
const koaRouter = require('koa-router');
const koaLogger = require('koa-logger');
const app = new Koa();
// app.use(async ctx => {
//     ctx.body = 'test';
// });
//ctx: object of req, res

app.use(koaBody());
app.use(koaLogger());
const router1 = require('./routes/1');
app.use(router1.routes());
// const defaultRouter = new koaRouter({ routerPath: '/' });
// defaultRouter.all('/', ctx => {
//     ctx.redirect('/1');
//     ctx.status = 301;
// });
app.listen(5000);

