const Router = require('koa-router');
const authRouter = new Router();
const authCtrl = require('./auth.controller');

authRouter.post('/register', authCtrl.register);
authRouter.post('/login', authCtrl.logIn);
authRouter.get('/exists/:k(id|email)/:v', authCtrl.exists);
//파라메터 제한, todo key 에약어 인지 테스트 > 예약어 아님
authRouter.post('/logout', authCtrl.logout);
authRouter.get('/verify', authCtrl.verify);

module.exports = authRouter;
