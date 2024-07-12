const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /
    // home(req, res, next) {
    //   Course.find({})
    //     .then((courses) => res.render("home", { courses }))
    //     .catch(next);
    // }

    // async home(req, res, next) {
    //   // res.render('home');
    //   try {
    //     const courses = await Course.find({});
    //     res.render("home", { courses: mutipleMongooseToObject(courses) });
    //   } catch (error) {
    //     next(error);
    //   }
    // }

    async show(req, res, next) {
        // [GET] /courses/:slug
        res.send('asldjklas');
    }
}

module.exports = new CourseController();
