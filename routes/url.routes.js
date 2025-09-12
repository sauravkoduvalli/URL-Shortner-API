import express from "express";

import { urlShortnerController } from "../controller/url.controller.js";
import { ensureAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(ensureAuthenticated);

router.post("/shorten", urlShortnerController);

export default router;
