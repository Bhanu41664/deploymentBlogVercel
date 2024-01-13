const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors =  require('cors');

const authRoute = require("./rootes/auth");
const userRoute = require("./rootes/Users");
const postRoute = require("./rootes/Posts");
const CategoriesRoute = require("./rootes/Categories");
const questinoRoute=require("./rootes/Question");
const multer = require("multer");
const UserModel = require("./models/User");
const path =require("path");

app.use("/images",express.static(path.join(__dirname,"/images")))

//bhanuprakashlagishetty
//gELEQAyZ1QHgUT7X
const url="mongodb+srv://bhanuprakashlagishetty:bhanuprakash@cluster1.lcpdkkr.mongodb.net/"
mongoose
  .connect(url)
  .then(console.log("connectd sunccesfully"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    let name = Date.now().toString() + file.originalname;
    req.body.filePath = name; 
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
console.log('Image Uploading Started');
const path=req.body.filePath;
const responseObject = { path };

  const jsonString = JSON.stringify(responseObject);

  // Send the JSON string as the response
  return res.send(jsonString);
// return res.json(path);
})


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", CategoriesRoute);
app.use("/api/question",CategoriesRoute);



app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
app.listen("5000", () => {
  console.log("backend is running");
});
