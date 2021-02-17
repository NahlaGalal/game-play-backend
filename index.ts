import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// Routes
import routes from "./routes";
// Instance
import { sequelize } from "./util/instance";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(routes);

sequelize.sync().then(() => {
  app.listen(4000, () => console.log("Connected"));
});
