import express, { Express } from "express";
//import helmet from "helmet";
//import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app: Express = express();

// set security HTTP headers
app.use(helmet());

// enable cors
// app.use(cors());
// app.options("*", cors());

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
  })
);

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
app.use(express.json());

app.use(cookieParser());

app.use("/api", router);

export default app;
