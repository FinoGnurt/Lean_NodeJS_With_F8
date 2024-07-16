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
app.engine("hbs",
  engine({
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

## 3. Tự động tạo createAt và updateAt trong Model

- <p>Trong file Model <=> Xóa 'createAt' và 'updateAt', thêm object 'timestamps: true' </p>

```
const Course = new Schema({
  name: { type: String, maxLength: 255, required: true },
  description: { type: String, maxLength: 600 },
  image: { type: String, maxLength: 255 },
  videoId: { type: String, maxLength: 255, required: true },
  level: { type: String, maxLength: 255 },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
```

<p align="center">-------------------- sửa thành --------------------</p>

```
const Course = new Schema(
  {
    name: { type: String, maxLength: 255, required: true },
    description: { type: String },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, maxLength: 255, required: true },
    level: { type: String, maxLength: 255 },
  },
  { timestamps: true }
);
```

## 4. Thêm helpers để chỉnh sửa id đếm số từ 1 trở lên trong handlebars (có 2 cách)

### Cách 1: Thêm 'helpers:{}' vào 'engine'

- <p>Trong file viewEngine <=> Thêm 'helpers:{}' vào 'engine({ extname: ".hbs" })' </p>

```
app.engine("hbs", engine({ extname: ".hbs" }));
```

<p align="center">-------------------- sửa thành --------------------</p>

```
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
```

### Cách 2: Thêm 'helpers:{}' vào 'res.render'

```
async storedCourses(req, res, next) {
  try {
    const courses = await Course.find({}).lean();
    res.render("me/stored-courses", { courses });
  } catch (err) {
    next(err);
  }
}
```

<p align="center">-------------------- sửa thành --------------------</p>

```
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
```
