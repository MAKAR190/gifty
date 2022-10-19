import styles from "../styles/enterAccount.module.css";
import { Inputs, Form, Buttons } from "../components";
import Logo from "../public/Logo.svg";
import Image from "next/image";
import Link from "next/link";
import { connect } from "react-redux";
import operations from "../redux/auth/operations";
import { NextSeo } from "next-seo";
import { baseHost } from "../utils/seo";
import { forgotPasswordEmailValidation } from "../utils/validationSchemas";

const ForgotPassword = ({ forgotPasswordRequest }) => {
  return (
    <>
      <NextSeo
        title="Forgot Password - Gifty"
        description="Here you can make a request to reset your account password"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/logoWhite.svg",
          },
        ]}
        openGraph={{
          type: "website",
          url: `${baseHost}/forgot-password`,
          title: "Forgot Password - Gifty",
          description:
            "Here you can make a request to reset your account password",
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
          site: `${baseHost}/forgot-password`,
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
      <div className={styles.alignWrapper}>
        <div className={styles.logoForgotPassword}>
          <Link href="/">
            <a>
              <Image
                alt="solarPowerLife"
                placeholder="blur"
                blurDataURL={Logo}
                src={Logo}
              />
            </a>
          </Link>
        </div>
        <div className={styles.forgotPasswordBox}>
          <div className={styles.forgotPasswordWrapper}>
            <p className={styles.forgotPasswordText}>
              Enter your email and check it after submitting the form and go by
              the sent link to reset your password. After submitting you have a
              few minutes to do this
            </p>
            <Form
              validationSchema={forgotPasswordEmailValidation}
              initialValues={{
                email: "",
              }}
              onSubmit={(values) => forgotPasswordRequest(values)}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <div className={styles.forgotPasswordInput}>
                    <Inputs.InputOne
                      name="email"
                      value={props.values.email}
                      onChange={props.handleChange}
                      title="Enter your email: "
                      errorMessage={props.errors.email}
                    />
                  </div>
                  <div className={styles.btnForgotPassword}>
                    <Buttons.Blue
                      type="submit"
                      disabled={
                        props.errors.email || props.values.email.length <= 0
                      }
                      text="submit"
                    />
                  </div>
                </form>
              )}
            </Form>
          </div>
        </div>
        <div className={styles.backBtnForgotPassword}>
          <Buttons.Black to="/login" text="To login page" caps={false} />
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  forgotPasswordRequest: operations.forgotPassword,
})(ForgotPassword);
