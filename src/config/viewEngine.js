const path = require('path');
const { engine } = require('express-handlebars');

const configViewEngine = (app, express) => {
    //express-handlebars --Template engine
    app.engine('hbs', engine({ extname: '.hbs' })); //"hbs" tùy chỉnh đuôi file cho file ở ngoài thư mục layout, ".hbs" tùy chỉnh đuôi file trong thư mục layout
    app.set('view engine', 'hbs');
    //   app.set("views", path.join(__dirname, "resources/views"));
    app.set('views', path.join('./src', 'resources', 'views'));

    //config static file
    //   app.use(express.static(path.join(__dirname, "./public")));
    app.use(express.static(path.join('./src', 'public')));
};

module.exports = configViewEngine;
