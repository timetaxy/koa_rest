<!-- commandPallete : Command + Shift + P -->
<!-- setting : Control + ,  -->

npm i koa koa-body koa-router koa-logger koa-bodyparser --s
npm i nodemon --save-dev

node path 지정 package, .jsconfig.json(for ide 자동완성) 파일

npm run dev

ref : https://www.toptal.com/nodejs/secure-rest-api-in-nodejs
POST on the endpoint /users (create a new user)
GET on the endpoint /users (list all users)
GET on the endpoint /users/:userId (get a specific user)
PUT, PATCH on the endpoint /users/:userId (update the data for a specific user)
DELETE on the endpoint /users/:userId (remove a specific user)

ROUTING >>>>>>>>>>>>>>

- 경로지정은 router.use 에
- router.use 에는 경로와 router.routes() / router.get 에는 실행 ctrl 명시
- router.use('/dir', importedRouter.routes()) < exports = router.use('/subDir', imported2Router.routes()) < router.get('/',ctrl.list);

// index.js
const Router = require('koa-router');
const router = new Router();
const router2 = require('./api');
router.use('/api', router2.routes());
app.use(router.routes()).use(router.allowedMethods());

// api/index.js
const Router = require('koa-router');
const api = new Router();
const router2 = require('./2');
api.use('/2', router2.routes());
module.exports = api;

// api/2/index.js
const Router = require('koa-router');
const route2 = new Router();
const ctrl = require('./api.controller');
route2.get('/', ctrl.list);
module.exports = route2;

// api/2/api.controller.js
exports.list = (ctx) => {
ctx.body = 'listed';
};
//localhost:4000/api/2

//////////////////

brew update
$ brew install mongodb

# 서버 실행하기

$ mkdir db
$ mongod --dbpath ./db

npm i mongoose
npm i dotenv

무료호스팅 https://mlab.com/

//brew tap mongodb/brew
//github로그인으로 클론 및 작업, but accessTkn 방식 바뀐후 불가

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

brew install mongodb-community
brew services info mongodb-community
brew services start mongodb-community

Rererenced, thanks to
//https://koajs.com
//https://developer88.tistory.com/383
//https://backend-intro.vlpt.us/1/04.html
//https://doubly12f.tistory.com/131?category=863262
