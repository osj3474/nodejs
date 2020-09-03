import express from "express"; // Router 만들려면, express가 필요함.
import passport from "passport";
import routes from "../routes"; // URL과 관련된 것들을 모두 변수화
import { home, search } from "../controllers/videoController"; // 아래 이유와 동일
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogIn,
  getMe,
} from "../controllers/userController"; // userController 에 있는 function들을 Router가 알고는 있어야 하니까 import
import { onlyPublic, onlyPrivate } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogIn
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
