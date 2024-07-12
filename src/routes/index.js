const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    app.use('/news', newsRouter);

    app.get('/test', (req, res) => {
        var a = 1;
        var b = 2;
        var c = a + b;
        return res.send('Hello World!:' + c);
    });

    //router default
    app.use('/', siteRouter);
}

module.exports = route;
