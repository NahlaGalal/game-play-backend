import { Router } from "express";
import {
  getGames,
  postAddGame,
  deleteGame,
} from "../controllers/gameController";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/userController";
import { checkAuth } from "../util/auth";

const router = Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/logout", checkAuth, logoutUser);

router.post("/download", checkAuth, postAddGame);

router.get("/download", checkAuth, getGames);

router.delete("/download", checkAuth, deleteGame);

export default router;
