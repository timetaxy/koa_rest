const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const { decode } = require('punycode');
/**
 * jwt
 * @param {any} payload
 * @returns {string} token
 */

function genTkn(payload) {
  return new Promise((res, rej) => {
    jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: '1d',
      },
      (err, tkn) => {
        if (err) rej(err);
        res(tkn);
      },
    );
  });
}

function verifyTkn(tkn) {
  return new Promise((res, rej) => {
    jwt.verify(tkn, jwtSecret, (error, decoded) => {
      if (error) rej(error);
      res(decoded);
    });
  });
}

exports.jwtMidware = async (ctx, next) => {
  const tkn = ctx.cookies.get('access_token');
  if (!tkn) return next();
  try {
    const decoded = await verifyTkn(tkn);
    // iat:issue at, exp:expire at
    // if (true) {
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      const { _id, email } = decoded;
      const freshTkn = await genTkn({ _id, email }, 'account');
      ctx.cookies.set('access_token', freshTkn, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      ctx.request.user = decoded;
    }
  } catch (e) {
    ctx.request.user = null;
  }
  return next();
};
exports.genTkn = genTkn;
