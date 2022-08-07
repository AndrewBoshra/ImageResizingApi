import express from "express";
import { convert } from "../controllers/convert_controller";

const router = express.Router();

router.get("/convert", convert);

export default router;
