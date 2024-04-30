/** @format */
require("dotenv").config();
const express = require("express");
const cookieParse = require("cookie-parser");
const routerIndex = require("./routers/routerIndex");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

require("./db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(routerIndex);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running at ${process.env.PORT || 3000}`);
});
