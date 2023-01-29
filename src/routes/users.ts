import express from "express";
import {
  signup,
  login,
  logout,
} from "../controllers/usersControllers";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export { router as usersRouter };
