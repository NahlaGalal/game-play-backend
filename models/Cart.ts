import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../util/instance";

interface ICart {
  id: number;
  userId: number;
  gameId: number;
}

interface CartCreationAttributes extends Optional<ICart, "id"> {}

export default class Cart
  extends Model<ICart, CartCreationAttributes>
  implements ICart {
  public id!: number;
  public userId!: number;
  public gameId!: number;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: "carts" }
);
