import express from "express";
import { sendContactMessage } from "./contact.controller.js";

const router = express.Router();

router.post("/", sendContactMessage);

export default router;
