const Joi = require('Joi');
const Account = require('models/account');
const schema = Joi.object().keys({
  id: Joi.string().alphanum().min(4).max(10).required(),
  info: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
  pw: Joi.string().min(6).required(),
});

exports.register = async ctx => {
  // ctx.body = 'register';

  // const result = Joi.validate(ctx.request.body, schema);//deprecated
  const validation = schema.validate(ctx.request.body);
  console.log(`validatioin result:${JSON.stringify(validation)}`);
  if (validation.error) {
    ctx.status = 400;
    ctx.body = JSON.stringify(validation.error);
    return;
  }
  const existing = await Account.findById(ctx.request.body).catch(e =>
    ctx.throw(500, e),
  );
  if (existing) {
    ctx.status = 409;
    ctx.body = {
      k: existing.info.email === ctx.request.body.info.email ? 'email' : 'id',
    };
    return;
  }
  const account = await Account.register(ctx.request.body).catch(e =>
    ctx.throw(500, e),
  );

  const tkn = await account.genTkn().catch(e => ctx.throw(500, e));
  ctx.cookies.set('access_token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  ctx.body = JSON.stringify(account);
};
exports.logIn = async ctx => {
  // ctx.body = 'login';
  const res = schema.validate(ctx.request.body);
  if (res.error) {
    ctx.status = 400;
    return;
  }
  const { id, pw } = ctx.request.body;
  const account = await Account.findById(id).catch(e => ctx.throw(500, e));
  if (!account || !account.validatePw(pw)) {
    ctx.status = 403;
    return;
  }
  const tkn = await account.genTkn().catch(e => ctx.throw(500, e));
  ctx.cookies.set('access_token', tkn, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  ctx.body = JSON.stringify(account);
};
exports.exists = async ctx => {
  // ctx.body = 'exists';
  const { k, v } = ctx.params;
  const existing = await (k === 'email'
    ? Account.findByEmail(v)
    : Account.findById(v)
  ).catch(e => ctx.throw(500, e));
  ctx.body = { exists: existing !== null };

  if (existing.error) {
    ctx.status = 500;
  }
  if (existing) {
    ctx.body = 'already exists';
  }
};
exports.logout = async ctx => {
  // ctx.body = 'logout';
  ctx.cookies.set('access_token', null, { maxAge: 0, httpOnly: true });
  ctx.status = 204;
};

exports.verify = ctx => {
  const { user } = ctx.request;
  if (!user) {
    ctx.status = 403;
    return;
  }
  ctx.body = JSON.stringify(user);
};
