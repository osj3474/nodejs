import passport from "passport";
import User from "./models/User";

passport.use(User.createStraategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
