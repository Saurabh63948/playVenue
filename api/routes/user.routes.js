import express from "express";
import { CreateUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/create-or-update", CreateUser);

export default router;
