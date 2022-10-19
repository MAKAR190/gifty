import { useEffect } from "react";
import { NextSeo } from "next-seo";
import { Title, Buttons, Cards } from "../components";
import getStripe from "../lib/getStripe";
import { client } from "../lib/client";
import styles from "../styles/Cart.module.css";
import { useStateContext } from "../context/StateContext";
import { connect } from "react-redux";
import selectors from "../redux/auth/selectors";
import operations from "../redux/auth/operations";


const Cart = ({ products, isAuthenticated, getMe }) => {
  const { totalPrice, cartItems, toggleCartItemQuanitity, onRemove } =
    useStateContext();
  useEffect(() => {
    const checkoutCode = JSON.parse(localStorage.getItem("checkoutCode"));
    if (isAuthenticated) {
      getMe();
    }
    if (checkoutCode) {
      localStorage.removeItem("checkoutCode");
    }
  }, []);
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    if (response.status === 500) return;

    const data = await response.json();
    stripe.redirectToCheckout({ sessionId: data.id });
    if (response.status === 200) {
      localStorage.setItem(
        "checkoutCode",
        JSON.stringify({ status: 200, type: "cart" })
      );
    }
  };
  return (
    <>
      <NextSeo
        title="Cart - Gifty"
        description="Your personal cart - Gifty"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/logoWhite.svg",
          },
        ]}
        nofollow={true}
      />
      <div className={styles.wrapper}>
        <main>
          <div className={styles.mainInfoBox}>
            <div className={styles.mainInfo}>
              <h1 className={styles.mainTitle}>shopping cart</h1>
              <h4 className={styles.total}>total: {totalPrice}$</h4>
              <div className={styles.mobileMainInfo}>
                <h1 className={styles.mobileMainTitle}>shopping cart</h1>
                <h4 className={styles.mobileTotal}>total: {totalPrice}$</h4>
              </div>
              <div className={styles.actions}>
                <div className={styles.action}>
                  <Buttons.Black
                    to="/products"
                    caps={true}
                    text="back to shop"
                  />
                </div>
                <div className={styles.action}>
                  <Buttons.Blue
                    disabled={cartItems.length <= 0}
                    onClick={handleCheckout}
                    text="checkout"
                  />
                </div>
              </div>
            </div>
          </div>
          <Title title="here are your added products" />
          {cartItems && cartItems.length > 0 && (
            <Cards.CartTable
              cartItems={cartItems}
              remove={(item) => onRemove(item)}
              incQuantity={(item) =>
                toggleCartItemQuanitity(
                  item._id,
                  "inc",
                  products.filter((el) => el._id === item._id)[0]
                )
              }
              decQuantity={(item) => toggleCartItemQuanitity(item._id, "dec")}
            />
          )}
          {cartItems.length <= 0 && (
            <p className={styles.info}>
              You haven&apos;t added any product on our website to your cart yet
            </p>
          )}
        </main>
      </div>
    </>
  );
};
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  return {
    props: { products },
  };
};
const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
  user: selectors.getUser(state),
});
export default connect(mapStateToProps, {
  getMe: operations.getMe,
})(Cart);
