import styles from "../../styles/enterAccount.module.css";
import { Inputs, Form, Buttons } from "../../components";
import Logo from "../../public/Logo.svg";
import Image from "next/image";
import Link from "next/link";
import { connect } from "react-redux";
import operations from "../../redux/auth/operations";
import { useRouter } from "next/router";
import { resetPasswordValidation } from "../../utils/validationSchemas";
import { NextSeo } from "next-seo";

const ForgotPassword = ({ resetPassword }) => {
  const router = useRouter();
  return (
    <>
      <NextSeo
        title="Reset your password - Gifty"
        description="Here you can reset your account password"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/logoWhite.svg",
          },
        ]}
        nofollow={true}
      />
      <div className={styles.alignWrapper}>
        <div className={styles.logoForgotPassword}>
          <Link href="/">
            <a>
              <Image placeholder="blur" blurDataURL={Logo} src={Logo} />
            </a>
          </Link>
        </div>
        <div className={styles.forgotPasswordBox}>
          <div className={styles.forgotPasswordWrapper}>
            <p className={styles.forgotPasswordText}>
              Now you can reset your password to a new one. After submitting we
              will redirect you to the login page
            </p>
            <Form
              validationSchema={resetPasswordValidation}
              initialValues={{
                password: "",
              }}
              onSubmit={(values) =>
                resetPassword({
                  newPassword: values.password,
                  token: router.query.token,
                })
              }
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <div className={styles.forgotPasswordInput}>
                    <Inputs.InputOne
                      name="password"
                      value={props.values.password}
                      onChange={props.handleChange}
                      errorMessage={props.errors.password}
                      type="password"
                      title="Enter your password: "
                    />
                  </div>
                  <div className={styles.btnForgotPassword}>
                    <Buttons.Blue
                      type="submit"
                      disabled={
                        props.errors.password ||
                        props.values.password.length <= 0
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
  resetPassword: operations.resetPassword,
})(ForgotPassword);
