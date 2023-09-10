const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const path = require("path");

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//mongodb connection
mongoose
  .connect(
    "mongodb+srv://rohitkr158:rohit123@cluster0.hzmgers.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connected");
  });

app.use("/api/user", userRoutes);

//static files
app.use(express.static(path.join(__dirname, "./flixxit-ui/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./flixxit-ui/build/index.html"));
});

//port
app.listen(5000, console.log("server started"));
