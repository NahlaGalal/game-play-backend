import { Router } from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/userController";
import { checkAuth } from "../util/auth";

const router = Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

export default router;
