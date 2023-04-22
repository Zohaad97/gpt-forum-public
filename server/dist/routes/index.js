"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../modules/auth");
const express_1 = __importDefault(require("express"));
const conversation_1 = require("../modules/conversation");
const auth_2 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/conversation", auth_2.verifyToken, conversation_1.createConversation);
router.get("/conversation/:id", auth_2.verifyToken, conversation_1.fetchConveration);
router.put("/conversation/:id/folder/:folderId", auth_2.verifyToken, conversation_1.changeConversationFolderPath);
router.get("/conversation-folder/all", auth_2.verifyToken, conversation_1.fetchAllConverationFolder);
router.post("/conversation-folder", auth_2.verifyToken, conversation_1.createConversationFolder);
router.patch("/conversation-folder/:id", auth_2.verifyToken, conversation_1.updateConversationFolder);
router.delete("/conversation-folder/:id", auth_2.verifyToken, conversation_1.deleteConversationFolder);
router.post("/auth/session", auth_1.loginByGoogleToken);
exports.default = router;
//# sourceMappingURL=index.js.map