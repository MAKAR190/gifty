import { useEffect } from "react";
import runFireworks from "../../utils/confetti";
import styles from "../../styles/Payment.module.css";
import successIcon from "../../public/cartSuccess.svg";
import { client } from "../../lib/client";
import { connect } from "react-redux";
import operations from "../../redux/auth/operations";
import selectors from "../../redux/auth/selectors";
import Image from "next/image";
import { useStateContext } from "../../context/StateContext";
import { Buttons } from "../../components";
import { NextSeo } from "next-seo";
import { createReadableDate } from "../../utils/date";
import withNoSSR from "../../hoc/withNoSSR";

const Success = ({ user, updateHistory, isAuthenticated }) => {
  const { refreshCart } = useStateContext();
  useEffect(() => {
    runFireworks();
    const code = JSON.parse(localStorage.getItem("checkoutCode"));
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (code && code.status === 200 && code.type === "cart") {
      if (isAuthenticated) {
        const copyOfCart = [...cartItems];
        copyOfCart.forEach((el) => (el.purchaseDate = createReadableDate()));

        copyOfCart.map((product) => {
          client
            .patch(product._id)
            .dec({ quantity: product.quantity })
            .commit()
            .then(() => {
              updateHistory(user._id, {
                history: [...copyOfCart, ...user.history],
              });
              refreshCart();
              localStorage.removeItem("checkoutCode");
            })
            .catch((err) => {
              console.error("Oh no, the update failed: ", err.message);
            });
        });
      } else {
        cartItems.map((product) => {
          client
            .patch(product._id)
            .dec({ quantity: product.quantity })
            .commit()
            .then(() => {
              refreshCart();
              localStorage.removeItem("checkoutCode");
            })
            .catch((err) => {
              console.error("Oh no, the update failed: ", err.message);
            });
        });
      }
    } else if (code && code.status === 200 && code.type === "once") {
      if (isAuthenticated) {
        client
          .patch(code.product._id)
          .dec({ quantity: code.quantity })
          .commit()
          .then(() => {
            updateHistory(user._id, {
              history: [
                {
                  ...code.product,
                  quantity: code.quantity,
                  purchaseDate: createReadableDate(),
                },
                ...user.history,
              ],
            });
            localStorage.removeItem("checkoutCode");
          })
          .catch((err) => {
            console.error("Oh no, the update failed: ", err.message);
          });
      } else {
        client
          .patch(code.productId)
          .dec({ quantity: code.quantity })
          .commit()
          .then(() => {
            localStorage.removeItem("checkoutCode");
          })
          .catch((err) => {
            console.error("Oh no, the update failed: ", err.message);
          });
      }
    } else {
      return;
    }
  }, []);
  return (
    <>
      <NextSeo
        title="Checkout Success - Gifty"
        description="Order was successfull"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/logoWhite.svg",
          },
        ]}
        nofollow={true}
      />
      <div className={styles.box}>
        <div className={styles.boxItems}>
          <div className={styles.successIcon}>
            <Image
              width={50}
              height={50}
              src={successIcon}
              alt="successCartIcon"
            />
          </div>
          <div className={styles.textGroup}>
            <h2 className={styles.title}>Thank you for your order!</h2>
            <p className={styles.descr}>
              Check your email inbox for the receipt
            </p>
          </div>
          <p className={styles.descr}>
            If you have any questions, please contact{" "}
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
  user: selectors.getUser(state),
});
export default connect(mapStateToProps, {
  updateHistory: operations.updateUserHistory,
})(withNoSSR(Success));
