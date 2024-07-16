const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class MeController {
  //[GET] /me/stored/courses
  async storedCourses(req, res, next) {
    try {
      const courses = await Course.find({}).lean();
      res.render("me/stored-courses", {
        courses,
        helpers: {
          sum: (a, b) => a + b,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new MeController();
