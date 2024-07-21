const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class MeController {
  //[GET] /me/stored/courses
  // async storedCourses(req, res, next) {
  //   try {
  //     const courses = await Course.find({}).lean();
  //     res.render("me/stored-courses", {
  //       courses,
  //       helpers: {
  //         sum: (a, b) => a + b,
  //       },
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  storedCourses(req, res, next) {
    Course.find({})
      .lean()
      .then((courses) =>
        res.render("me/stored-courses", {
          courses,
          helpers: {
            sum: (a, b) => a + b,
          },
        })
      )
      .catch(next);
  }

  //[GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .lean()
      .then((courses) =>
        res.render("me/trash-courses", {
          courses,
          helpers: {
            sum: (a, b) => a + b,
          },
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
