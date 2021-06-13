const koaRouter = require('koa-router');

let testRes = [
    { id: 0, title: 'a' },
    { id: 1, title: 'b' },
    { id: 2, title: 'c' }
];

const router1 = new koaRouter({
    prefix: '/1'
});
router1.get('/', (ctx, next) => {
    ctx.body = {
        status: 'success',
        value: testRes
    };
    next();
});

module.exports = router1;