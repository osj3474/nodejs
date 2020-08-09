import express from "express"; // Router 만들려면, express가 필요함.
import routes from "../routes"; // URL과 관련된 것들을 모두 변수화
import { home, search } from "../controllers/videoController"; // 아래 이유와 동일
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userController"; // userController 에 있는 function들을 Router가 알고는 있어야 하니까 import

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.logout, logout);

export default globalRouter;
