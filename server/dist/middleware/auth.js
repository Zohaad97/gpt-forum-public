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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.access_token;
        console.log({ token });
        if (!token) {
            res.status(401).send({ message: "unauthorized" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env["JWT_SECRET_KEY"] || "");
        if (!decoded.id || !decoded.email) {
            res.status(401).send({ message: "unauthorized" });
            return;
        }
        const user = yield prisma.user.findUnique({
            where: { email: decoded.email },
            select: { id: true },
        });
        if (!user) {
            res.status(401).send({ message: "unauthorized" });
            return;
        }
        req.params["client_id"] = (user === null || user === void 0 ? void 0 : user.id) || "";
        next();
    }
    catch (err) {
        res.status(401).send({ message: String(err) });
    }
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map