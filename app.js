import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { userRouter } from "./router";

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// // get methods something (not listen method here)
app.use("/user", userRouter); // 사용자가 '/'에 접근하면, userRouter가 이를 처리할 것이라는 의미

export default app; // 다른 파일에서 import하면, app object를 준다는 의미
