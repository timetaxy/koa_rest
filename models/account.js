const mongoose = require('mongoose');
const crypto = require('crypto');
const { Schema } = mongoose;
/**
 * .statics: this-모델전체 > Ex1.staticFunc('test');
 * .methods: this-데이터인스턴스 > ex1.methods();
 */
const hash = pw => {
  return crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(pw)
    .digest('hex');
};

const Account = new Schema({
  id: String,
  info: { email: String },
  pw: String,
  createdAt: { type: Date, default: Date.now },
});

Account.statics.findById = id => {
  return this.findOne({ id: id }).exec();
};

Account.statics.register = function ({ id, email, pw }) {
  // Account.statics.register = ({ id, email, pw }) => {
  const account = new this({
    id: id,
    info: { email },
    pw: hash(pw),
  });
  return account.save();
};

Account.methods.validatePw = pw => {
  const hashed = hash(pw);
  return this.pw === hashed;
};

module.exports = mongoose.model('Account', Account);
