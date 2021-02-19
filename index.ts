import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
// Routes
import routes from "./routes";
// Instance
import { sequelize } from "./util/instance";

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(multer({ storage }).single("userImage"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync().then(() => {
  app.listen(4000, () => console.log("Connected"));
});
