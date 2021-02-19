import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface IMulter extends Request {
  file: any;
}

export const signupUser = async (req: Request, res: Response) => {
  const { fName, lName, email, password } = req.body;
  const imgType = (req as IMulter).file.mimetype;
  const imgName = (req as IMulter).file.originalname;
  const imgData = (req as IMulter).file.buffer;

  console.log((req as IMulter).file)

  try {
    await User.create({
      fName,
      lName,
      email,
      password,
      imgType,
      imgName,
      imgData,
      token: "",
    });
    res.json({ isFailed: false, errors: {}, data: { success: true } });
  } catch (err) {
    res.json({
      isFailed: true,
      errors: { message: err.errors[0].message },
      data: {},
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      attributes: ["id", "fName", "lName", "imgUrl"],
      where: {
        email,
        password,
      },
    });
    if (user) {
      const userId = user.id;
      const token = jwt.sign({ id: userId }, "supersecret");

      await User.update({ token }, { where: { id: userId } });

      return res.json({
        isFailed: false,
        errors: {},
        data: {
          name: `${user.fName} ${user.lName}`,
          // img: user.imgUrl,
          token,
        },
      });
    } else {
      return res.json({
        isFailed: true,
        errors: { message: "Email or password aren't correct" },
        data: {},
      });
    }
  } catch (errors) {
    console.log(errors);
    return res.json({
      isFailed: true,
      errors,
      data: {},
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  try {
    await User.update({ token: "" }, { where: { id: userId } });
    res.json({ isFailed: false, errors: {}, data: { success: true } });
  } catch (errors) {
    res.json({ isFailed: true, errors, data: {} });
  }
};
