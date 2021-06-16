`use strict`;
require('dotenv').config();

const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const router22 = new Router();
const koaLogger = require('koa-logger');
const router1 = require('./routes/1');
const router2 = require('./api');
const bodyParser = require('koa-bodyParser');
const PORT = process.env.PORT || 4000;
const app = new Koa();
console.log(`NODE_PATH:${process.env.NODE_PATH}`);
// app.use(bodyParser()); //json data parser for db process
// app.use(async ctx => {
//   // 아무것도 없으면 {} 가 반환됩니다.
//   ctx.body = ctx.request.body;
// });
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

///////////////

// app.use(async ctx => {
//     ctx.body = 'test';
// });
// ctx: object of req, res

app.use(
  bodyParser({
    formidable: { uploadDir: './uploads' },
    multipart: true,
    urlencoded: true,
  }),
);
app.use(koaLogger());
// app.use(koaBody()); //json data parser for db process
app.use(router1.routes()).use(router1.allowedMethods());
// app.use(router1.routes()).use(cors()).use(router1.allowedMethods());
// cors() : open all domain, case of test
// app.use(bodyParser()); //json data parser for db process

router22.use('/api', router2.routes());
app.use(router22.routes()).use(router22.allowedMethods());

// const defaultRouter = new koaRouter({ routerPath: '/' });
// defaultRouter.all('/', ctx => {
//     ctx.redirect('/1');
//     ctx.status = 301;
// });
app.listen(PORT, () => {
  console.log(`server is listening on port : ${PORT}`);
});
// app.listen(4000);

const jwt = require('jsonwebtoken');
const token = jwt.sign(
  { foo: 'bar' },
  'secret-key',
  { expiresIn: '1d' },
  (err, token) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(token);
  },
);
