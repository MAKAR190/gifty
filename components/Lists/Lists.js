import styles from "./Lists.module.css";
const ShopCardsList = ({ children }) => {
  return <div className={styles.scl}>{children}</div>;
};
const CartCardsList = ({ children }) => {
  return <div className={styles.ccl}>{children}</div>;
};

module.exports = {
  ShopCardsList: ShopCardsList,
  CartCardsList: CartCardsList,
};
