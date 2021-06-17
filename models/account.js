const mongoose = require('mongoose');
const { genTkn } = require('lib/toknes');
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

Account.statics.findById = function (id) {
  // Account.statics.findById = id => {
  return this.findOne({ id: id }).exec();
};

Account.statics.findByEmail = function (email) {
  return this.findOne({ info: { email: email } }).exec();
};

Account.statics.register = function ({ id, email, pw }) {
  // Account.statics.register = ({ id, email, pw }) => { //it's not working, false this target
  const account = new this({
    id: id,
    info: { email },
    pw: hash(pw),
  });
  return account.save();
};

Account.methods.validatePw = function (pw) {
  // Account.methods.validatePw = pw => {
  const hashed = hash(pw);
  return this.pw === hashed;
};

Account.methods.genTkn = function () {
  const payload = {
    _id: this._id,
    email: this.info.email,
  };
  return genTkn(payload, 'account');
};

module.exports = mongoose.model('Account', Account);
