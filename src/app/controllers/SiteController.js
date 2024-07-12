const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    // home(req, res, next) {
    //   Course.find({})
    //     .then((courses) => res.render("home", { courses }))
    //     .catch(next);
    // }

    async home(req, res, next) {
        // res.render('home');
        try {
            const courses = await Course.find({});
            res.render('home', { courses: mutipleMongooseToObject(courses) });
        } catch (error) {
            next(error);
        }
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
