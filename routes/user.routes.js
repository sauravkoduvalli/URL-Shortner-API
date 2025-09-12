import express from "express";

import {
  signupController,
  loginController,
  getUsersController,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/all", getUsersController);

export default router;
