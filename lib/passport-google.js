import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import axios from "axios";
import { baseHost } from "../utils/seo";

axios.defaults.baseURL = "https://spl-be.onrender.com";

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      callbackURL: `${baseHost}/api/oauth2/redirect/google`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        axios({
          method: "POST",
          url: "auth/google/login",
          data: {
            user: {
              id: profile.id,
              email: profile.email,
            },
          },
        })
          .then((res) => {
            done(null, {
              profile: profile,
              accessToken: res.data.access_token,
            });
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.error(err);
        done(err, false, { message: "Internal server error" });
      }
    }
  )
);
