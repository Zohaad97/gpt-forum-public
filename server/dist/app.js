"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import helmet from "helmet";
//import cookieParser from "cookie-parser";
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
// set security HTTP headers
app.use((0, helmet_1.default)());
// enable cors
// app.use(cors());
// app.options("*", cors());
app.use((0, cors_1.default)({
    origin: "http://127.0.0.1:3000",
    credentials: true,
}));
// app.use(function (_, res, next) {
//   res.header("Content-Type", "application/json;charset=UTF-8");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// parse json request body
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api", routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map