const mongoose = require('mongoose');
const { Schema } = mongoose;

const Inner = new Schema({
  name11: String,
  val11: Number,
});
const Obj = new Schema({
  name1: String,
  inner1: [Inner],
  date1: Date,
  number1: Number,
  arr1: [String],
  defaultExample1: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ex1', Obj); //args1 name of schema, args2 obj of schema
/**
 * MongoDB 에서 컬렉션 이름을 만들때의 컬렉션은 구분자를 사용하지 않고, (user_info 같은), 복수형태로 쓰는것 (books 처럼)
 * 만약에 이 컨벤션을 따르고 싶지 않다면 세번째 파라미터로 이름지정
mongoose.model('Book', Book, 'custom_book_collection');
 */
