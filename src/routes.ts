import express from "express";
import Debuger from "debuger";
/** IMPORT ROUTERS */

import dotenv from "dotenv";
import main_controller from "controllers/main_controller";
dotenv.config();

const Debug = Debuger("Routes");
const router = express.Router();

/** --- ROUTES --- */
router.get("/links/:page?", main_controller.get_links);
router.get("/pages", main_controller.get_pages);
router.get("/:shortUrl", main_controller.get_link);
router.post("/", main_controller.create_link);

/** SAMPLE */
export = router;
