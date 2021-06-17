const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
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
        if (err) reject(err);
        resolve(tkn);
      },
    );
  });
}
exports.genTkn = genTkn;
