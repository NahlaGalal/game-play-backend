import e, { Router } from "express";
import { signupUser } from "../controllers/userController";

const router = Router();

router.get("/signup", signupUser);

export default router;
