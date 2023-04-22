"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteConversationFolder = exports.updateConversationFolder = exports.changeConversationFolderPath = exports.createConversationFolder = exports.fetchAllConverationFolder = exports.fetchConveration = exports.createConversation = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const clientId = req.params["client_id"] || "";
    try {
        const folder = yield fetchConversationFolder(body.folder.id, clientId);
        if (!folder) {
            res.status(403).send({ message: "Invalid folder" });
            return;
        }
        const createdConversation = yield prisma.conversation.create({
            data: {
                title: body.title,
                avatar: body.avatarUrl,
                conversationFolderId: body.folder.id,
                messages: {
                    createMany: {
                        data: body.items.map((item) => {
                            return {
                                content: item.value,
                                from: item.from,
                            };
                        }),
                    },
                },
            },
            include: { messages: true },
        });
        res.status(200).send(createdConversation);
    }
    catch (err) {
        console.error(err);
        res.status(401).send({ message: err.message });
    }
});
exports.createConversation = createConversation;
const fetchConveration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conversationId = req.params["id"];
    try {
        const data = yield prisma.conversation.findFirst({
            select: {
                id: true,
                title: true,
                messages: true,
                conversationFolder: true,
            },
            where: { id: Number(conversationId) },
        });
        if (data === null || data === void 0 ? void 0 : data.conversationFolder) {
            const conversation = {
                title: (data === null || data === void 0 ? void 0 : data.title) || "",
                avatarUrl: "",
                folder: {
                    id: data.conversationFolder.id,
                    name: data.conversationFolder.name,
                },
                items: (data === null || data === void 0 ? void 0 : data.messages.map((item) => {
                    return {
                        from: item.from,
                        value: item.content,
                    };
                })) || [],
            };
            res.send(conversation);
        }
        else {
            res.status(404).send();
        }
    }
    catch (err) {
        console.error(err);
        res.status(401).send({ message: err.message });
    }
});
exports.fetchConveration = fetchConveration;
const fetchAllConverationFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = req.params["client_id"] || "";
    try {
        const data = yield prisma.conversationFolder.findMany({
            select: {
                id: true,
                name: true,
                conversations: true,
            },
            where: { userId: clientId },
        });
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send();
        }
    }
    catch (err) {
        console.error(err);
        res.status(401).send({ message: err.message });
    }
});
exports.fetchAllConverationFolder = fetchAllConverationFolder;
const createConversationFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const clientId = req.params["client_id"] || "";
    try {
        if (!body.name) {
            res.status(403).send({ message: "Folder name required" });
        }
        const conversationFolder = yield _createConversationFolder(body.name, clientId);
        res.send(conversationFolder);
    }
    catch (err) {
        console.error(err);
        res.status(401).send({ message: err.message });
    }
});
exports.createConversationFolder = createConversationFolder;
const changeConversationFolderPath = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = req.params["client_id"] || "";
    const folderId = Number(req.params["folderId"]) || 0;
    const converationId = Number(req.params["id"]) || 0;
    try {
        let conversation = yield prisma.conversation.findFirst({
            where: {
                id: converationId,
                conversationFolder: {
                    user: {
                        id: clientId,
                    },
                },
            },
        });
        if (conversation) {
            conversation = yield prisma.conversation.update({
                where: { id: converationId },
                data: { conversationFolderId: folderId },
            });
        }
        else {
            res.status(404).send();
            return;
        }
        res.send(conversation);
    }
    catch (err) {
        console.error(err);
        res.status(401).send({ message: err.message });
    }
});
exports.changeConversationFolderPath = changeConversationFolderPath;
const updateConversationFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const clientId = req.params["client_id"] || "";
    const folderId = Number(req.params["id"]) || 0;
    try {
        if (!body.name) {
            res.status(403).send({ message: "Folder name required" });
        }
        let conversationFolder = yield prisma.conversationFolder.findFirst({
            where: { id: folderId, userId: clientId },
        });
        if (conversationFolder) {
            conversationFolder = yield prisma.conversationFolder.update({
                where: { id: folderId },
                data: { name: body.name },
            });
        }
        else {
            res.status(404).send();
            return;
        }
        res.send(conversationFolder);
    }
    catch (err) {
        console.error(err);
        res.status(401).send({ message: err.message });
    }
});
exports.updateConversationFolder = updateConversationFolder;
const deleteConversationFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = req.params["client_id"] || "";
    const folderId = Number(req.params["id"]) || 0;
    try {
        let conversationFolder = yield prisma.conversationFolder.findFirst({
            where: { id: folderId, userId: clientId },
        });
        if (conversationFolder) {
            yield prisma.conversationFolder.delete({
                where: { id: folderId },
            });
        }
        else {
            res.status(404).send();
            return;
        }
        res.status(200).send();
    }
    catch (err) {
        console.error(err);
        res.status(401).send({ message: err.message });
    }
});
exports.deleteConversationFolder = deleteConversationFolder;
const _createConversationFolder = (name, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.conversationFolder.create({
            data: {
                name: name,
                userId: userId,
            },
        });
        return data;
    }
    catch (err) {
        console.error(err);
        throw err.message;
    }
});
const fetchConversationFolder = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.conversationFolder.findFirst({
            where: {
                id,
                userId,
            },
        });
        return data;
    }
    catch (err) {
        console.error(err);
        throw err.message;
    }
});
//# sourceMappingURL=conversation.js.map