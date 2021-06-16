<!-- commandPallete : Command + Shift + P -->
<!-- setting : Control + ,  -->

npm i koa koa-body koa-router koa-logger koa-bodyparser --s
npm i nodemon --save-dev

node path 지정 package, .jsconfig.json(for ide 자동완성) 파일

\*dot env 환경변수를 문서화
환경변수 실행 ex) NODE_PATH=./ node .

1. router
2. router ctrl 분리
3. mongo crud > ex1
4. mongo crud, hashing, static function > account

//nodemon issue
npm uninstall nodemon
sudo npm install nodemon -g
sudo npm install -g --force nodemon

npm run dev

npm run dev

"dev": "NODE_PATH=./ nodemon ./index.js",

> npm run dev

"start:dev": "NODE_PATH=./ nodemon ./index.js"

> yarn start:dev
> : yarn
> //////////////////

// body-parser comparison
koa-body now support koa version 2. The main difference now remains about file payload parsing. The koa-bodyparser cannot parse files, i.e. multipart/form-data.

// ctx.request undefined issue
Content-Length 헤더 필수

////////rest

ref : https://www.toptal.com/nodejs/secure-rest-api-in-nodejs
POST on the endpoint /users (create a new user)
GET on the endpoint /users (list all users)
GET on the endpoint /users/:userId (get a specific user)
PUT, PATCH on the endpoint /users/:userId (update the data for a specific user)
DELETE on the endpoint /users/:userId (remove a specific user)

- way of transfer data
- ctx.request.query.foo => GET, PATCH, DELETE
- ?query
- ctx.request.body.foo => POST, PUT
- body
- ctx.params.foo => GET, PATCH, DELETE
- path

ROUTING >>>>>>>>>>>>>>

- 경로지정은 router.use 에
- router.use 에는 경로와 router.routes() / router.get 에는 실행 ctrl 명시
- router.use('/dir', importedRouter.routes()) < exports = router.use('/subDir', imported2Router.routes()) < router.get('/',ctrl.list);
- 하위 경로 생성시마다 router.use()로 라우터간 연결시켜줘야 함

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

nodemon --watch 는 감시패스 지정시
nodemon --watch app --watch libs app/server.js
//https://github.com/remy/nodemon

mongodb remove
.remove: 특정 조건을 만족하는 데이터
.findByIdAndRemove: id 를 찾아서
.findOneAndRemove: 특정 조건을 만족하는 데이터 하나

put 전체수정 / patch 하나만 수정

HMAC SHA256 의 경우엔 데이터를 주어진 비밀키(secret) 와 함께 해싱을 하고, 해싱된 결과물을 비밀키와 함께 다시한번 해싱

모델 메소드는 두 종류로 만들 수 가 있습니다. .statics 와 .methods 인데요, 각 종류는 서로 가르키는 this 값이 다른데요, 전자의 경우엔 모델 자체를 가르키고, 후자의 경우엔 데이터 인스턴스를 가르킴

도메인 필터링 가능
authRouter.get('/exists/:k(id|email)/:v', authCtrl.exists);

mongoos DTO 내 this 는 arrow ex 아니고 function으로 구현할 것

static 은 객체타입에서, methods는 구현체에서 콜 가능
Account.statics.findById
Account.findById(ctx.request.body).catch ...
Account.methods.validatePw = pw => {
account.validatePw(pw)

Rererenced, thanks to
//https://www.tutorialspoint.com/koajs/koajs_quick_guide.htm
//https://koajs.com
//https://developer88.tistory.com/383
//https://backend-intro.vlpt.us/1/04.html
//https://doubly12f.tistory.com/131?category=863262

//promise
//https://ssungkang.tistory.com/entry/ES6-Promises-then-catch-all-race-finally
