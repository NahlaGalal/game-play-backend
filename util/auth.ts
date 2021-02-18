import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface IDecoded {
  [key: string]: any;
}

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split("Bearer ")[1];

  if (!token)
    return res.status(401).json({
      isFailed: true,
      errors: { auth: false, message: "No token provided" },
      data: {},
    });

  const user = await User.findOne({ where: { token } });

  if (user) {
    jwt.verify(token, "supersecret", (err, decoded: IDecoded | undefined) => {
      if (err)
        return res.status(500).json({
          isFailed: true,
          errors: { auth: false, message: "Failed to authenticate token" },
        });

      if (decoded) res.locals.userId = decoded?.id;
      next();
    });
  } else {
    res
      .status(401)
      .json({
        isFailed: true,
        errors: { message: "Unauthorized user" },
        data: {},
      });
  }
};
