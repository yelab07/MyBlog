const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5050;
require("dotenv").config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/blog-db",
  (err) => {
    if (err) throw new Error({ msg: err });
    console.log("connected to mongodb");
  }
);

app.use("/blog", require("./routes/blogRoutes"));
app.use("/user", require("./routes/userRoutes"));

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
