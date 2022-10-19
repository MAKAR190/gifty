import { useEffect } from "react";
import styles from "./Modal.module.css";
import close from "../../public/close.png";
import Image from "next/image";
const Modal = ({ children, onClose }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleEvent);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleEvent);
      }
    };
  }, []);
  const handleEvent = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <div onClick={onClose} className={styles.close}>
            <Image src={close} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
const SmallModal = ({ children, onClose }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleEvent);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleEvent);
      }
    };
  }, []);
  const handleEvent = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.smallWrapper}>
        <div className={styles.smallModal}>
          <div onClick={onClose} className={styles.close}>
            <Image src={close} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

module.exports = {
  Modal: Modal,
  SmallModal: SmallModal,
};
