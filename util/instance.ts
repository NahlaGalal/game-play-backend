import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("game_play", "Nahla", "gt-b3410", {
  port: 5432,
  dialect: "postgres",
  logging: false,
});
