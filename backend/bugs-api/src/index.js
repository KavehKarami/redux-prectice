const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();
const app = express();

class Application {
  constructor() {
    this.setupExpress();
    this.setupMongooseConnection();
    this.useConfig();
    this.securityConfig();
    this.useRoutes();
  }

  setupExpress() {
    const port = process.env.APPLICATION_PORT || process.env.PORT;
    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`app is running on http://localhost:${port}`);
    });
  }

  setupMongooseConnection() {
    mongoose.connect(
      `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    mongoose.Promise = global.Promise;
  }

  useConfig() {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  }

  securityConfig() {
    app.use(helmet());
    app.disable("x-powered-by");
  }

  useRoutes() {
    app.use("/api/bugs", require("./routes/bugs"));
  }
}

module.exports = Application;
