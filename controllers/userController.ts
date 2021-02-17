import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.create({
    fName: "Nahla",
    lName: "Galal",
    email: "nahlaglal@gmail.com",
    password: "12345678"
  })
  console.log(user.id, user.fName)
  res.json(user.id)
}