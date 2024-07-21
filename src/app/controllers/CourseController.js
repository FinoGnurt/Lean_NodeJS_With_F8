const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

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

  // [GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .lean()
      .then((course) => {
        res.render("courses/show", { course });
      })
      .catch(next);
  }

  //[GET] /course/create
  create(req, res, next) {
    res.render("courses/create");
  }

  //[POST] /course/store
  store(req, res, next) {
    // const course = new Course(req.body);
    // course.save();

    //

    const formdata = req.body;
    formdata.image = `https://i3.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`;
    const course = new Course(formdata);
    course
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
  }

  //[GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .lean()
      .then((course) => res.render("courses/edit", { course }))
      .catch(next);
  }

  //[PUT] /courses/:id/update
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  //[DELETE] /courses/:id/delete
  destroy(req, res, next) {
    Course.delete({_id: req.params.id})
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[PATCH] /courses/:id/delete
  restore(req, res, next) {
    Course.restore({_id: req.params.id})
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new CourseController();
