import express from "express";
import { Sequelize } from "sequelize";

const app = express();

export const sequelize = new Sequelize("game_play", "Nahla", "gt-b3410", {
  port: 5432,
  dialect: "postgres",
  logging: false
});

(async () => {
  try {
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.listen(4000, () => console.log("Connected"));
