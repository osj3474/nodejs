import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
import { localMiddleware } from "./middleware";

const app = express();

app.set("view engine", "pug");
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localMiddleware);

app.use(routes.home, globalRouter); // routes.home = "/"
app.use(routes.users, userRouter); // routes.users = "/users"
app.use(routes.videos, videoRouter); // routes.videos = "/videos"

export default app;
