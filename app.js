//express app
const express = require("express");
const app = express();

//port for localhost
const port = 3000;

//to connect to mongodb
const mongoose = require('mongoose'); 

//connect to mongodb and listen to requests
mongoose.connect("mongodb+srv://mahajankunal018:rQawez6BhND67LAa@cluster0.yezrj7g.mongodb.net/resultManagement1?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected"));

//register view engine
app.set('view engine', 'ejs');
//middleware and static files

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());

//express layouts
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

//teacher and student routes
const teachRoutes = require("./routes/teacherRoutes")
const studRoutes = require("./routes/studentRoutes")
app.use("/teacher",teachRoutes);
app.use("/student",studRoutes);

//routes
app.get("/", (req, res) => {
  res.render("index");
});

//localhost port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});