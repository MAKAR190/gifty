import passport from "passport";
import "../../lib/passport-google";

export default async function (req, res, next) {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: true,
  })(req, res, next);
}