import {
  Model,
  DataTypes,
  Optional,
  Association,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
} from "sequelize";
import { sequelize } from "../util/instance";
import Cart from "./Cart";

interface IUser {
  id: number;
  fName: string;
  lName: string;
  email: string;
  password: string;
  imgUrl: string;
  token: string;
}

interface UserCreationAttributes extends Optional<IUser, "id"> {}

export default class User
  extends Model<IUser, UserCreationAttributes>
  implements IUser {
  public id!: number;
  public fName!: string;
  public lName!: string;
  public email!: string;
  public password!: string;
  public imgUrl!: string;
  public token!: string;

  public addToCart!: HasManyAddAssociationMixin<Cart, number>;
  public getCart!: HasManyGetAssociationsMixin<Cart>;

  public readonly carts?: Cart[];

  public static associations: {
    carts: Association<User, Cart>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fName: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    lName: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING(50),
    imgUrl: DataTypes.STRING,
    token: DataTypes.STRING,
  },
  { sequelize, tableName: "users" }
);

User.hasMany(Cart, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "carts",
});
