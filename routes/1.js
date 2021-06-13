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
    const qryStr = ctx.query.title;
    ctx.body = {
        status: 'success',
        title: testRes,
        yourClient: qryStr
    };
    // next();
    //without next : if same api spec, it will excute bottom api
});

router1.get('/', (ctx, next) => {
    ctx.body = {
        status: 'success',
        value: testRes
    };
    next();
});

router1.post('/insert', (ctx, next) => {
    if (!ctx.request.body.title) {
        //todo : use props, validation for all api
        ctx.response.status = 400;
        ctx.body = 'invalid request';
    } else {
        const latestId = testRes[testRes.length - 1].id;
        console.log(`latest objectId: ${latestId}`);
        let newVal = {
            id: latestId + 1,
            title: ctx.request.body.title
        };
        testRes.push(newVal);
        ctx.response.status = 201;
        ctx.body = {
            status: 'success',
            message: `newly inserted, id:${newVal.id}`
        };
    }
    next();
});

// dynamic data also available (result of pushed value)
router1.get('/:id', (ctx, next) => {
    // let filteredVal = null;
    let filteredVal = testRes.filter(x => {
        console.log(typeof (x.id));
        console.log(x.id);
        console.log(typeof (ctx.params.id));
        console.log(ctx.params.id);
        return x.id === parseInt(ctx.params.id);
    });
    if (filteredVal[0] && filteredVal[0].title) {
        // if (filteredVal != null) {
        ctx.body = `selected value:${filteredVal[0].title}`;
    } else {
        ctx.response.status = 404;
        ctx.body = {
            status: `error`,
            message: `proper value not found, id:${ctx.params.id}`
        };
    }
    next();
});



module.exports = router1;