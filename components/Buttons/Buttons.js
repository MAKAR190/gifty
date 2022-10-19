import styles from "./Buttons.module.css";
import { Icon } from "@iconify/react";
import Link from "next/link";
import withNoSSR from "../../hoc/withNoSSR";

const Blue = ({
  text,
  caps,
  width,
  height,
  padding,
  type,
  to,
  onClick,
  disabled,
}) => {
  return (
    <>
      {to ? (
        <Link href={to}>
          <button
            disabled={disabled}
            style={{
              width: width,
              height: height,
              padding: padding,
              textTransform: caps && !caps ? "none" : "uppercase",
            }}
            type={type}
            className={disabled ? styles.disabled : styles.blue}
            onClick={onClick}
          >
            {text}
          </button>
        </Link>
      ) : (
        <button
          disabled={disabled}
          style={{
            width: width,
            height: height,
            padding: padding,
            textTransform: caps && !caps ? "none" : "uppercase",
          }}
          type={type}
          className={disabled ? styles.disabled : styles.blue}
          onClick={onClick}
        >
          {text}
        </button>
      )}
    </>
  );
};
const Black = ({ text, caps, width, height, padding, type, to, onClick }) => {
  return (
    <>
      {to ? (
        <Link href={to}>
          <button
            style={{
              width: width,
              height: height,
              padding: padding,
              textTransform: caps && caps ? "uppercase" : "none",
            }}
            type={type}
            className={styles.black}
            onClick={onClick}
          >
            {text}
          </button>
        </Link>
      ) : (
        <button
          style={{
            width: width,
            height: height,
            padding: padding,
            textTransform: caps && caps ? "uppercase" : "none",
          }}
          type={type}
          className={styles.black}
          onClick={onClick}
        >
          {text}
        </button>
      )}
    </>
  );
};
const SignUp = ({ text, width, height, padding, minWidth, type, onClick }) => {
  return (
    <button
      style={{
        width: width,
        height: height,
        padding: padding,
        minWidth: minWidth,
      }}
      className={styles.signUp}
      type={type}
      onClick={onClick}
    >
      <div className={styles.signUpBox}>
        <p>{text}</p>
        <div className={styles.icon}>
          <Icon icon="flat-color-icons:google" />
        </div>
      </div>
    </button>
  );
};

module.exports = {
  Blue: withNoSSR(Blue),
  Black: Black,
  SignUp: SignUp,
};
