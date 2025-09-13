import express from "express";

import {
  urlShortnerController,
  findUrlByShortCodeController,
  getAllCodesController,
  deleteCodeController,
} from "../controller/url.controller.js";
import { ensureAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(ensureAuthenticated);

router.post("/shorten", urlShortnerController);
router.get("/codes", getAllCodesController);
router.delete("/codes/:id", deleteCodeController);
router.get("/:shortCode", findUrlByShortCodeController);

export default router;
