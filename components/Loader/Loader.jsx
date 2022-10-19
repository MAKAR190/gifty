import { Icon } from "@iconify/react";
import styles from "./Loader.module.css";
const Loader = () => {
  return (
    <div className="loader">
      <div className={styles.box}>
        <Icon icon="eos-icons:loading" />
      </div>
    </div>
  );
};

module.exports = Loader;
