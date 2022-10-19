import passport from "passport";
import { setCookie } from "nookies";
import "../../../../lib/passport-google";
import { baseHost } from "../../../../utils/seo";

export default async function (req, res, next) {
  passport.authenticate("google", (err, user, info) => {
    if (err || !user) {
      return res.redirect(`${baseHost}/?a=auth_fail`);
    }
    setCookie({ res }, "fromServer", user.accessToken, {
      maxAge: 60000,
      path: "/profile",
    });
    setCookie({ res }, "fromServerEmail", user.profile.email, {
      maxAge: 60000,
      path: "/profile",
    });

    res.redirect(`${baseHost}/profile`);
  })(req, res, next);
}
