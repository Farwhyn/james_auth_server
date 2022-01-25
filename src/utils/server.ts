import express from "express";
import routes from "../routes";
import deserialize from "../middleware/deserialize";
import bodyParser from "body-parser";

export default function () {
  const app = express();

  app.use(bodyParser.json())
  app.use(deserialize);

  routes(app);

  return app;
}