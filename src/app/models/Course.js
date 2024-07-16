const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

//mongoose-slug-generator:
//slug: "name" => lấy giá trị từ name trong db
//slugPaddingSize: 4 => tạo ra bộ đếm nếu trùng "name" (phải có unique: true).
// ==>> Vd: slugPaddingSize: 4 => nodejs-0001, slugPaddingSize: 1 => nodejs-1
//unique: true => nếu "name" trùng thì tạo 1 chuỗi string bất kì cho ko bị trùng nữa
// unique sẽ dùng thư viện shordId trong thư viện mongoose-slug-updater để nối thêm Id vào đuôi "name"

const Course = new Schema(
  {
    name: { type: String, maxLength: 255, required: true },
    description: { type: String },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, maxLength: 255, required: true },
    level: { type: String, maxLength: 255 },
    slug: { type: String, slug: "name", slugPaddingSize: 1, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", Course);
