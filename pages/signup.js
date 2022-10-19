import { useState, useEffect } from "react";
import styles from "../styles/enterAccount.module.css";
import mainBg from "../public/mainLBG.jpg";
import logo from "../public/Logo.svg";
import { Layout, Buttons, Form, Inputs, Checkbox, Loader } from "../components";
import Image from "next/image";
import Link from "next/link";
import { connect } from "react-redux";
import operations from "../redux/auth/operations";
import selectors from "../redux/auth/selectors";
import { submitValidation } from "../utils/validationSchemas";
import { toast } from "react-toastify";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { baseHost } from "../utils/seo";

const Signup = ({ signUp, isAuthenticated, loading }) => {
  const [mobile, setMobile] = useState(false);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [redirectValue, setRedirectValue] = useState(isAuthenticated);
  const possibleEmail =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("getStartedEmail"));
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
    signUp({
      ...values,
    });
  };

  return (
    <>
      <NextSeo
        title="Sign Up - Gifty"
        description="Register your account - Gifty"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/logoWhite.svg",
          },
        ]}
        openGraph={{
          type: "website",
          url: `${baseHost}/signup`,
          title: "Sign Up - Gifty",
          description: "Register your account - Gifty",
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
          site: `${baseHost}/signup`,
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
            alt="signUp"
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
                email: possibleEmail ? possibleEmail : "",
                password: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={submitValidation}
            >
              {(props) => (
                <div className={styles.form}>
                  <form
                    id={styles.actualForm}
                    className={styles.form}
                    onSubmit={props.handleSubmit}
                  >
                    <h3 className={styles.formTitle}>Register account</h3>
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
                    <div className={styles.checkbox}>
                      <Checkbox
                        value={acceptedPolicy}
                        onChange={() => setAcceptedPolicy((prev) => !prev)}
                        black
                        html={true}
                      >
                        <p className={styles.checkboxParagraph}>
                          Accept our{" "}
                          <span className={styles.link}>Privacy Policy</span>
                        </p>
                      </Checkbox>
                    </div>
                    <div className={styles.submitBtn}>
                      <Buttons.Blue
                        disabled={
                          props.errors.email ||
                          props.errors.password ||
                          props.values.email.length <= 0 ||
                          props.values.password.length <= 0 ||
                          !acceptedPolicy
                        }
                        type="submit"
                        text="Sign up"
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
                    {acceptedPolicy ? (
                      <Link href="/api/login" passHref>
                        <a>
                          <Buttons.SignUp
                            type="button"
                            text="Authenticate with"
                          />
                        </a>
                      </Link>
                    ) : (
                      <Buttons.SignUp
                        onClick={() =>
                          toast.error(
                            "You have to accept our privacy policy before authentication, please check the box in the sign up form"
                          )
                        }
                        type="button"
                        text="Authenticate with"
                      />
                    )}
                  </div>
                  <p className={styles.paragraph}>
                    Already have an account?
                    <Link href="/login">
                      <span id={styles.pLink} className={styles.link}>
                        Log in
                      </span>
                    </Link>
                  </p>
                </div>
              )}
            </Form>
          </div>
          <div className={styles.backBtn}>
            <Buttons.Black caps={false} to="/" text="To main page" />
          </div>
        </div>
        {loading && <Loader />}
      </main>
    </>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
  loading: selectors.getLoading(state),
});
export default connect(mapStateToProps, {
  signUp: operations.register,
})(Signup);
