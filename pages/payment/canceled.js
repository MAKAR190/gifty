import styles from "../../styles/Payment.module.css";
import errorIcon from "../../public/cartError.svg";
import Image from "next/image";
import { Buttons } from "../../components";
import { connect } from "react-redux";
import selectors from "../../redux/auth/selectors";
import { NextSeo } from "next-seo";
import withNoSSR from "../../hoc/withNoSSR";

const Canceled = ({ isAuthenticated }) => {
  return (
    <>
      <NextSeo
        title="Checkout Canceled - Solar Power Life"
        description="Order was successfull"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/logoWhite.svg",
          },
        ]}
        nofollow={true}
      />
      <div id={styles.errorBox} className={styles.box}>
        <div className={styles.boxItems}>
          <div className={styles.successIcon}>
            <Image width={50} height={50} src={errorIcon} alt="errorCartIcon" />
          </div>
          <div className={styles.textGroup}>
            <h2 className={styles.title}>
              oops, seems that you canceled your order
            </h2>
            <p className={styles.descr}>
              Or it can be error with stripe checkout
            </p>
          </div>
          <p className={styles.descr}>
            If you think it is not your fault, please contact{" "}
            <a href="mailto:devmaklut@gmail.com" className="contentLink">
              devmaklut@gmail.com
            </a>
          </p>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <Buttons.Blue to="/products" text="go to shop" />
            </div>
            {isAuthenticated && (
              <div className={styles.button}>
                <Buttons.Black caps={true} to="/profile" text="check profile" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
});
export default connect(mapStateToProps)(withNoSSR(Canceled));
