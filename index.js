`use strict`;
require('dotenv').config();

const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const router = new Router();
const koaLogger = require('koa-logger');
const router1 = require('./routes/1');
const router2 = require('./api');
const bodyParser = require('koa-bodyParser');
const PORT = process.env.PORT || 4000;
const app = new Koa();

//////mongo
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
app.use(bodyParser()); //json data parser for db process
///////////////

// app.use(async ctx => {
//     ctx.body = 'test';
// });
// ctx: object of req, res

app.use(koaBody());
app.use(koaLogger());
app.use(router1.routes()).use(router1.allowedMethods());
// app.use(router1.routes()).use(cors()).use(router1.allowedMethods());
// cors() : open all domain, case of test
router.use('/api', router2.routes());
app.use(router.routes()).use(router.allowedMethods());

// const defaultRouter = new koaRouter({ routerPath: '/' });
// defaultRouter.all('/', ctx => {
//     ctx.redirect('/1');
//     ctx.status = 301;
// });
app.listen(PORT, () => {
  console.log(`server is listening on port : ${PORT}`);
});
// app.listen(4000);
