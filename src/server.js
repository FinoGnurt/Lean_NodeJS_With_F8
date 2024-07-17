//import library
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");

//use library
const app = express();
const port = 8080;

//import src
const configViewEngine = require("./config/viewEngine");
const route = require("./routes");

//import connect mongoose
const db = require("./config/db");

//Connect to DB
db.connect();

//middleware post
app.use(express.urlencoded({ extended: true })); //form
app.use(express.json()); //javascript

app.use(methodOverride("_method"));

//Morgan --HTTP logger
app.use(morgan("short"));

//express-handlebars --Template engine
configViewEngine(app, express);

//Routes init (routes/index.js)
route(app);

app.listen(port, () => console.log(`Server is running on port ${port}!`));
