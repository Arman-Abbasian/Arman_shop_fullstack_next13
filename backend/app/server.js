const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const allRoutes = require("./router/router");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const createError = require("http-errors");
const path = require("path");
const { allRoutes } = require("./router/router");
dotenv.config();
class Application {
  #app = express();
  #PORT = process.env.PORT || 5000;
  #DB_URI = process.env.APP_DB;
  #allowedOrigins = ["http://localhost:3000", process.env.ALLOW_CORS_ORIGIN];

  constructor() {
    this.createServer();
    this.connectToDB();
    this.configServer();
    this.initClientSession();
    this.configRoutes();
    this.errorHandling();
  }
  createServer() {
    this.#app.listen(this.#PORT || 5000, () =>
      console.log(`listening on port ${this.#PORT}`)
    );
  }
  connectToDB() {
    mongoose
      .connect(this.#DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => console.log("MongoDB connected!!"))
      .catch((err) => {
        console.log(this.#DB_URI);
        console.log("Failed to connect to MongoDB", err);
      });
  }
  //{ credentials: true, origin: process.env.ALLOW_CORS_ORIGIN }
  const;
  configServer() {
    this.#app.use(cors({ credentials: true, origin: this.#allowedOrigins }));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..")));
  }
  initClientSession() {
    this.#app.use(cookieParser(process.env.COOKIE_PARSER_SECRET_KEY));
  }
  configRoutes() {
    this.#app.use("/api", allRoutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("not found"));
    });
    this.#app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        statusCode,
        message,
      });
    });
  }
}

module.exports = Application;
