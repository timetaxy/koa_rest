const Joi = require('joi');
const { Types: ObjectId } = require('mongoose');
// const ObjectId=require('mongoose').Types.ObjectId;
const Ex1 = require('models/ex1');

//localhost:4000/api/2
// exports.list = async ctx => {
//   // ctx.body = 'listed';
//   let res = await Ex1.find()
//     .sort({ _id: -1 }) //desc sort
//     .limit(3)
//     .exec()
//     .catch(e => {
//       console.log(`error occur ${e}`);
//       ctx.throw(500, e);
//     });
//   ctx.body = res;
// };

/** findone */
exports.list = async ctx => {
  const { id } = ctx.params;
  let res = await Ex1.findById(id)
    .exec()
    .catch(e => ctx.throw(500, e));
  if (!res) {
    ctx.status = 404;
    ctx.body = { message };
    return;
  }
  ctx.body = res;
};

exports.create = async ctx => {
  // ctx.body = 'created';
  const { name1, inner1, date1, number1, arr1, defaultExample1 } =
    ctx.request.body;
  const ex1 = new Ex1({
    name1,
    inner1,
    date1,
    number1,
    arr1,
    defaultExample1,
  });

  await ex1.save().catch(x => {
    return ctx.throw(500, e);
  });
  ctx.body = ex1;
};
exports.delete = async ctx => {
  // ctx.body = 'deleted';
  const { id } = ctx.params;
  const res = await Ex1.findByIdAndRemove(id)
    .exec()
    .catch(e => {
      if (e.name === 'CastError') {
        ctx.status = 400;
        return;
      }
    });
  ctx.status = 204;
};
exports.replace = async ctx => {
  // ctx.body = 'replaced';
  const { id } = ctx.params;
  if (ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  const schema = Joi.object().keys({
    name1: Joi.string().required(),
    inner1: Joi.array().items(
      Joi.object().keys({
        name11: Joi.string().require(),
        val11: Joi.string().email().required(),
      }),
    ),
    date1: Joi.date().required(),
    number1: Joi.number().required(),
    arr1: Joi.array().required(),
    defaultExample1: Joi.array().items(Joi.string().required()),
  });

  const result = Jooi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const res = await Ex1.findByIdAndUpdate(id, ctx.request.body, {
    upsert: true,
    new: true, //리턴값은 업데이트된 새 value
  }).catch(e => {
    return ctx.throw(500, e);
  });
  ctx.body = res;
};
exports.update = async ctx => {
  // ctx.body = 'updated';
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  const res = await Ex1.findByIdAndUpdate(id, ctx.request.body, {
    new: true,
    // upsert 는 기본값 false
  }).catch(e => {
    return ctx.throw(500, e);
  });
  ctx.body = res;
};
/* object ref
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
*/
