const Joi = require('Joi');
const Account = require('models/account');
exports.register = async ctx => {
  // ctx.body = 'register';
  const schema = Joi.object().keys({
    id: Joi.string().alphanum().min(4).max(10).required(),
    info: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
    pw: Joi.string().min(6).required(),
  });
  // const result = Joi.validate(ctx.request.body, schema);//deprecated
  const validation = schema.validate(ctx.request.body);
  console.log(`validatioin result:${JSON.stringify(validation)}`);
  if (validation.error) {
    ctx.status = 400;
    ctx.body = JSON.stringify(validation.error);
    return;
  }
  const res = await Account.register(ctx.request.body).catch(e =>
    ctx.throw(500, e),
  );
  ctx.body = JSON.stringify(res);
};
exports.logIn = async ctx => {
  ctx.body = 'login';
};
exports.exists = async ctx => {
  ctx.body = 'exists';
};
exports.logout = async ctx => {
  ctx.body = 'logout';
};
