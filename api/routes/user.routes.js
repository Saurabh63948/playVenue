import express from "express";
import { CreateUser, fetchAllUser, fetchUserByClerkId } from "../controllers/userController.js";

const router = express.Router();

router.post("/create-or-update", CreateUser);
router.get("/fetchAllUser",fetchAllUser)
router.get("/getUserByClerkId",fetchUserByClerkId)
export default router;
