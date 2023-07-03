import express from "express";
import Debuger from "./debuger";
/** IMPORT ROUTERS */

import dotenv from "dotenv";
import { create_link, get_link, get_links, get_pages } from "./controllers/main_controller";
dotenv.config();

const Debug = Debuger("Routes");
const router = express.Router();

/** --- ROUTES --- */
router.get("/links/:page?", get_links);
router.get("/pages", get_pages);
router.get("/:shortUrl", get_link);
router.post("/", create_link);

/** SAMPLE */
export = router;
