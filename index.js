const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const body_parser = require("body-parser");
require("dotenv").config();

const app = express();
const url = "mongodb://localhost:27017/registerdb";

const employeeRouter = require("./routes/SignUp");
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const con = mongoose.connection;

con.on("error", (err) => {
  console.log("Error " + err);
});

con.once("open", () => {
  console.log("database connection established");
});

app.use(morgan("dev"));
//app.use(body_parser.urlencoded({extended:true}))
//app.use(body_parser.json())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.port || 9000;

app.use("/sign-up", employeeRouter);

app.listen(port, () => {
  console.log("Server started " + port);
});
