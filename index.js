`use strict`;
require('dotenv').config();

const Koa = require('koa');
const koaBody = require('koa-body');
// const koaRouter = require('koa-router');
const koaLogger = require('koa-logger');
const router1 = require('./routes/1');
const router2 = require('./api');
const PORT = process.env.PORT || 4000;
const app = new Koa();
// app.use(async ctx => {
//     ctx.body = 'test';
// });
// ctx: object of req, res

app.use(koaBody());
app.use(koaLogger());
app.use(router1.routes()).use(router1.allowedMethods());
// app.use(router1.routes()).use(cors()).use(router1.allowedMethods());
// app.use('/api', router2.routes()).use(router2.allowedMethods());
// cors() : open all domain, case of test

// const defaultRouter = new koaRouter({ routerPath: '/' });
// defaultRouter.all('/', ctx => {
//     ctx.redirect('/1');
//     ctx.status = 301;
// });
app.listen(PORT, () => {
  console.log(`server is listening on port : ${PORT}`);
});
// app.listen(5000);

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose
  // .connect(process.env.MONGO_URI, {
  //   useMongoClient: true,
  // })
  // previous version of mongoose5 before

  .connect(process.env.MONGO_URI)
  .then(response => {
    console.log('mongodb connect success');
  })
  .catch(e => {
    console.error(e);
  });
