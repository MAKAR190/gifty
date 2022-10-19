import { useState, useEffect } from "react";
import { Title, Inputs, Checkbox, Buttons, Form, Cards } from "../components";
import withNoSSR from "../hoc/withNoSSR";
import { NextSeo } from "next-seo";
import styles from "../styles/Profile.module.css";
import profileIcon from "../public/profile.png";
import nookies from "nookies";
import Image from "next/image";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import operations from "../redux/auth/operations";
import selectors from "../redux/auth/selectors";
import { toast } from "react-toastify";
import { emailDetailsSubmitValidation } from "../utils/validationSchemas";


const Profile = ({
  getUser,
  isAuthenticated,
  user,
  updateEmailDetails,
  subscribe,
  getMe,
  token,
  fromServerEmail,
}) => {
  const [subscribed, setSubscribed] = useState(user.subscribed);
  const router = useRouter();
  useEffect(() => {
    getMe();
  }, []);
  useEffect(() => {
    getMe();
  }, [user.subscribed]);
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!isAuthenticated && !auth) {
      router.push("/login");
    }
  }, [isAuthenticated]);
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth === "google") {
      getUser({ email: fromServerEmail }, token);
      localStorage.removeItem("auth");
    }
  }, []);
  const handleSubmit = (values) => {
    if (user.subscribed) {
      if (subscribed) {
        updateEmailDetails(user.bindedEmail._id, {
          firstName: values.firstName,
          lastName: values.lastName,
        });
        return;
      } else {
        subscribe(
          user._id,
          {
            subscribed: subscribed,
          },
          "unsubscribe"
        );
      }
    }
    if (subscribed) {
      subscribe(
        user._id,
        {
          subscribed: subscribed,
          firstName: values.firstName,
          lastName: values.lastName,
        },
        "subscribe"
      );
    } else {
      toast.info("You have to be subscribed to change your email details");
    }
  };
  return (
    <>
      <NextSeo
        title="Profile - Gifty"
        description="Your personal account - Gifty"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/logoWhite.svg",
          },
        ]}
        nofollow={true}
      />
      {user && (
        <div className={styles.wrapper}>
          <main>
            <div className={styles.mainInfoBox}>
              <div className={styles.mainInfo}>
                <div className={styles.profileIcon}>
                  <Image src={profileIcon} />
                </div>
                <p className={styles.email}>{user.email}</p>
              </div>
            </div>
          </main>

          <div className={styles.detailsBox}>
            <div id={styles.firstColumn} className={styles.detailsColumn}>
              <Form
                initialValues={{
                  firstName: user.bindedEmail ? user.bindedEmail.firstName : "",
                  lastName: user.bindedEmail ? user.bindedEmail.lastName : "",
                }}
                onSubmit={handleSubmit}
                validationSchema={emailDetailsSubmitValidation}
              >
                {(props) => (
                  <form onSubmit={props.handleSubmit}>
                    <h4 id={styles.desktop} className={styles.detailsTitle}>
                      Email
                    </h4>
                    <div id={styles.firstColumnInput} className={styles.input}>
                      <h4 id={styles.mobile} className={styles.detailsTitle}>
                        Email
                      </h4>
                      <Inputs.InputOne
                        name="firstName"
                        value={props.values.firstName}
                        onChange={props.handleChange}
                        errorMessage={props.errors.firstName}
                        title="First Name: "
                      />
                    </div>
                    <div id={styles.firstColumnInput} className={styles.input}>
                      <Inputs.InputOne
                        name="lastName"
                        value={props.values.lastName}
                        onChange={props.handleChange}
                        errorMessage={props.errors.lastName}
                        title="Last name: "
                      />
                    </div>
                    <div id={styles.checkbox} className={styles.input}>
                      <Checkbox
                        type="profile"
                        black
                        text="Subscribed on email communication"
                        value={subscribed}
                        defaultChecked={subscribed}
                        onChange={() => setSubscribed((prev) => !prev)}
                      />
                    </div>
                    <div className={styles.submitBtn}>
                      <Buttons.Blue
                        type="submit"
                        disabled={
                          props.errors.firstName || props.errors.lastName
                        }
                        caps={false}
                        text="Save details"
                      />
                    </div>
                  </form>
                )}
              </Form>
            </div>
            <div id={styles.secondColumn} className={styles.detailsColumn}>
              <h4 id={styles.desktop} className={styles.detailsTitle}>
                Billing
              </h4>
              <div className={styles.input}>
                <h4 id={styles.mobile} className={styles.detailsTitle}>
                  Billing
                </h4>
                <p className={styles.infoText}>
                  Our site uses{" "}
                  <a
                    href="https://stripe.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="contentLinkInfo"
                  >
                    Stripe
                  </a>{" "}
                  for payment processes. That means that we don&apos;t ask you
                  for payment information, you provide it only to stripe in
                  checkout page. If you want to save your payment information
                  for future payments on our site, please click on checkbox in
                  checkout form during payment and enter your phone. Then in
                  future payments you will be able to do payments through your
                  saved information by accepting your request with SMS code
                </p>
              </div>
            </div>
          </div>
          <Title title="history" />
          {user.history && user?.history.length > 0 ? (
            <Cards.History history={user.history} />
          ) : (
            <p style={{ textAlign: "center" }} className={styles.infoText}>
              You haven&apos;t bought any products yet
            </p>
          )}
        </div>
      )}
    </>
  );
};
export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);

  return {
    props: {
      token: cookies.fromServer ? cookies.fromServer : null,
      fromServerEmail: cookies.fromServerEmail ? cookies.fromServerEmail : null,
    },
  };
}
const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
  user: selectors.getUser(state),
});
export default connect(mapStateToProps, {
  getUser: operations.getUserByEmail,
  getMe: operations.getMe,
  updateEmailDetails: operations.updateEmailDetails,
  subscribe: operations.subscribeOnEmail,
})(withNoSSR(Profile));
