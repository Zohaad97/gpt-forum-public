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
exports.loginByGoogleToken = void 0;
const client_1 = require("@prisma/client");
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const jwtExpirySeconds = 60 * 60 * 60 * 60 * 60;
const loginByGoogleToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        const clientId = process.env["GOOGLE_CLIENT_ID"];
        const jwtSecretKey = process.env["JWT_SECRET_KEY"];
        if (!clientId || !jwtSecretKey)
            return;
        const client = new google_auth_library_1.OAuth2Client(clientId);
        // Call the verifyIdToken to
        // varify and decode it
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: clientId,
        });
        // Get the JSON with all the user info
        const payload = ticket.getPayload();
        if (!(payload === null || payload === void 0 ? void 0 : payload.email) || !payload.name || !payload.picture) {
            res.status(401).send({ message: "invalid token" });
            return;
        }
        const user = yield prisma.user.upsert({
            where: { email: payload === null || payload === void 0 ? void 0 : payload.email },
            create: {
                email: payload.email,
                name: payload.name,
                image: payload.picture,
            },
            update: {},
            select: { id: true, email: true },
        });
        const jwtToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, jwtSecretKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        });
        res.cookie("access_token", jwtToken, { httpOnly: true }).status(200).send();
    }
    catch (err) {
        res.status(401).send({ message: "invalid token" });
    }
});
exports.loginByGoogleToken = loginByGoogleToken;
//# sourceMappingURL=auth.js.map