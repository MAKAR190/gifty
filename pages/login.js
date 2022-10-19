import { useState, useEffect } from "react";
import styles from "../styles/enterAccount.module.css";
import mainBg from "../public/MainLBG.jpg";
import logo from "../public/Logo.svg";
import { NextSeo } from "next-seo";
import { Layout, Buttons, Form, Inputs, Loader } from "../components";
import Image from "next/image";
import Link from "next/link";
import selectors from "../redux/auth/selectors";
import { connect } from "react-redux";
import operations from "../redux/auth/operations";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { submitValidation } from "../utils/validationSchemas";
import { baseHost } from "../utils/seo";

const Login = ({ logIn, isAuthenticated, loading }) => {
  const [mobile, setMobile] = useState(false);
  const [redirectValue, setRedirectValue] = useState(isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      localStorage.removeItem("auth");
    }
    if (isAuthenticated) {
      router.push("/");
      toast.error(
        "You have already logged in with account, if you want to log in or sign up another account you need to log out in menu"
      );
    }
    let mounted = true;
    if (typeof window !== "undefined" && mounted) {
      if (window.innerWidth < 1024) {
        setMobile(true);
      }
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    if (redirectValue !== isAuthenticated) {
      window.location.href = "/profile";
    }
  }, [isAuthenticated]);
  const handleSubmit = (values) => {
    logIn({
      ...values,
    });
  };
  return (
    <>
      <NextSeo
        title="Login - Gifty"
        description="Login into your account - Gifty"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/logoWhite.svg",
          },
        ]}
        openGraph={{
          type: "website",
          url: `${baseHost}/login`,
          title: "Login - Gifty",
          description: "Login into your account - Gifty",
          images: [
            {
              url: "/logoWhite.svg",
              width: 800,
              height: 600,
              alt: "Gifty",
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: `${baseHost}/login`,
          cardType: "summary_large_image",
        }}
        robotsProps={{
          nosnippet: true,
          notranslate: true,
          noimageindex: true,
          noarchive: true,
          maxSnippet: -1,
          maxImagePreview: "none",
          maxVideoPreview: -1,
        }}
      />
      <main className={styles.wrapper}>
        {!mobile && (
          <Layout
            width="50%"
            height={"100vh"}
            objectPosition="50% 70%"
            priority={true}
            animated={false}
            src={mainBg}
            alt="login"
          >
            <div className={styles.titleWrapper}>
              <h2 className={styles.mainTitle}>power</h2>
              <h2 className={styles.mainTitle}>your home</h2>
              <h2 className={styles.mainTitle}>with the</h2>
              <h2 className={styles.mainTitle}>sun</h2>
            </div>
          </Layout>
        )}

        <div className={styles.formWrapper}>
          <div className={styles.logo}>
            <div>
              <Image
                alt="solarPowerLife"
                src={logo}
                placeholder="blur"
                blurDataURL={logo}
              />
            </div>
          </div>
          <div className={styles.formBox}>
            <Form
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={submitValidation}
            >
              {(props) => (
                <div className={styles.form}>
                  <form
                    onSubmit={props.handleSubmit}
                    id={styles.actualForm}
                    className={styles.form}
                  >
                    <h3 className={styles.formTitle}>Login</h3>
                    <div className={styles.input}>
                      <Inputs.InputOne
                        value={props.values.email}
                        onChange={props.handleChange}
                        name="email"
                        title="Enter your email: "
                        error={!!props.errors.email}
                        errorMessage={props.errors.email}
                        touched={props.touched.email}
                      />
                    </div>
                    <div className={styles.input}>
                      <Inputs.InputOne
                        title="Enter your password: "
                        type="password"
                        name="password"
                        onChange={props.handleChange}
                        value={props.values.password}
                        error={!!props.errors.password}
                        errorMessage={props.errors.password}
                        touched={props.touched.password}
                      />
                    </div>
                    <div className={styles.submitBtn}>
                      <Buttons.Blue
                        disabled={
                          props.errors.email ||
                          props.errors.password ||
                          props.values.email.length <= 0 ||
                          props.values.password.length <= 0
                        }
                        type="submit"
                        text="Login"
                      />
                    </div>
                  </form>
                  <p className={styles.or}>or</p>
                  <div
                    onClick={() =>
                      localStorage.setItem("auth", JSON.stringify("google"))
                    }
                    className={styles.input}
                  >
                    <Link href="/api/login">
                      <a>
                        <Buttons.SignUp text="Authenticate with" />
                      </a>
                    </Link>
                  </div>
                  <p className={styles.paragraph}>
                    Don&apos;t have an account?
                    <Link href="/signup">
                      <span id={styles.pLink} className={styles.link}>
                        Sign up
                      </span>
                    </Link>
                  </p>
                </div>
              )}
            </Form>
          </div>
          <Link href="/forgot-password">
            <p className={styles.secondLink}>Forgot your password?</p>
          </Link>
          <div className={styles.backBtn}>
            <Buttons.Black caps={false} to="/" text="To main page" />
          </div>
        </div>
      </main>
      {loading && <Loader />}
    </>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
  loading: selectors.getLoading(state),
});
export default connect(mapStateToProps, { logIn: operations.logIn })(Login);
