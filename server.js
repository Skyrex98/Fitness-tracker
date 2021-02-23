const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
//getting mongodb connection
const connectDB = require("./config/db");
//getting route files

const webRoutes = require("./routes/index");
const workout = require("./routes/workout");

//using body parser
app.use(express.json());

//setting static folder

app.use(express.static(path.join(__dirname, "public")));

//connecting to db
connectDB();
const PORT = process.env.PORT || 5000;
app.use(morgan("dev"));

//Mount Routres

app.use("/", webRoutes);
app.use("/workout", workout);

const serverRun = app.listen(PORT, () => {
  console.log(`server running in on port ${PORT}`);
});
//handling unhandled promise rejection rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //closing the server & exit process
  //passing 1 mean we r closing it with some error
  serverRun.close(() => process.exit(1));
});
