import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// Routes
import routes from "./routes";
// Instance
import { sequelize } from "./util/instance";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

const queryInterface = sequelize.getQueryInterface();

sequelize.sync().then(() => {
  app.listen(4000, () => console.log("Connected"));
});
