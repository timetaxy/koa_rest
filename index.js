const Koa = require('koa');
const koaBody = requrie('koa-body');

const app = new Koa();
// app.use(async ctx => {
//     ctx.body = 'test';
// });
//ctx: object of req, res

app.use(koaBody());
const defaultRouter = new Router();
defaultRouter.all('/auth', ctx => {
    ctx.redirect('/');
    ctx.status = 301;
});
app.listen(5000);

