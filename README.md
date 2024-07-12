## 1. Có 2 cách viết hàm lấy dữ liệu (READ) là file json

- <p>Trong file `SiteController.js`</p>

### Cách 1: Viết theo dạng callback

```
  async home(req, res) {
    try {
      const courses = await Course.find({});
      res.json(courses);
    } catch (err) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }
```

<p align="center">-------------------- hoặc --------------------</p>

```
  home(req, res) {
    async function getReviews() {
      const reviewlist = await Course.find({});
      return reviewlist;
    }
    getReviews().then(function findItems(item) {
      res.json(item);
    });
  }

```

### Cách 2: Viết theo dạng promise

```
  home(req, res) {
    Course.find({})
      .then((courses) => {
        res.json(courses);
      })
      .catch((err) => {
        res.status(400).json({ error: "ERROR!!!" });
      });
  }
```

---

</br>

## 2. Lỗi không đọc được document từ mongoDB với handlebars

### Cách 1: Thêm 'runtimeOptions: {allowProtoPropertiesByDefault: true}'

- <p>Trong file config/viewengine.js. Thêm 'runtimeOptions: {allowProtoPropertiesByDefault: true}'</p>

```
app.engine("hbs", engine({ extname: ".hbs", defaultLayout: "main" }));
```

<p align="center">-------------------- sửa thành --------------------</p>

```
app.engine("hbs",engine({
      extname: ".hbs",
      defaultLayout: "main",
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
      },
    })
);
```

### Cách 2: Thêm '.lean()' vào sau 'find({})'

- <p>Trong file SiteController <=> Thêm '.lean()' vào sau 'find({})' </p>

```
Course.find({})
```

<p align="center">-------------------- sửa thành --------------------</p>

```
Course.find({}).lean()
```

### Cách 3: Thêm 'courses = courses.map((x) => x.toObject())'

- <p>Trong file SiteController. Thêm 'courses = courses.map((x) => x.toObject())' </p>

```
  home(req, res, next) {
    Course.find({})
      .then((courses) => res.render("home", { courses }))
      .catch(next);
  }
```

<p align="center">-------------------- sửa thành --------------------</p>

> Promise

```
  home(req, res, next) {
    Course.find({})
      .then((courses) => {
        courses = courses.map((courses) => courses.toObject());
        res.render("home", { courses });
      })
      .catch(next);
  }
```

> CallBack

```
async home(req, res, next) {
  try {
    let courses = await Course.find({});
    courses = courses.map(courses => courses.toObject());
    res.render("home", { courses });
  } catch (err) {
    next(err);
  }
}

```
