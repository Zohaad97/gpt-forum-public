import { loginByGoogleToken } from "../modules/auth";
import express, { Router } from "express";
import {
  changeConversationFolderPath,
  createConversation,
  createConversationFolder,
  deleteConversationFolder,
  fetchAllConverationFolder,
  fetchConveration,
  updateConversationFolder,
} from "../modules/conversation";
import { verifyToken } from "../middleware/auth";

const router: Router = express.Router();

router.post("/conversation", verifyToken, createConversation);
router.get("/conversation/:id", verifyToken, fetchConveration);
router.put(
  "/conversation/:id/folder/:folderId",
  verifyToken,
  changeConversationFolderPath
);

router.get("/conversation-folder/all", verifyToken, fetchAllConverationFolder);
router.post("/conversation-folder", verifyToken, createConversationFolder);
router.patch("/conversation-folder/:id", verifyToken, updateConversationFolder);
router.delete(
  "/conversation-folder/:id",
  verifyToken,
  deleteConversationFolder
);

router.post("/auth/session", loginByGoogleToken);
export default router;
