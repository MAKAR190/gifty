import Image from "next/image";
import styles from "./Layout.module.css";
import { useState, useEffect } from "react";

export const Layout = ({
  width,
  height,
  maxHeight,
  alt,
  src,
  objectPosition,
  priority,
  children,
  animated,
  srcs,
  minHeight,
  type,
  small,
  main,
}) => {
  const [animatedBg, setAnimatedBg] = useState(0);
  const [anim, setAnim] = useState(false);
  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setAnim(true);
        setAnimatedBg((prev) => (prev === srcs.length - 1 ? 0 : prev + 1));
      }, 15000);
      setAnim(false);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);
  useEffect(() => {
    setAnim(false);
  }, [animatedBg]);
  return (
    <div
      style={{
        width: width,
        height: height,
        position: "relative",
        maxHeight: maxHeight,
        minHeight: minHeight,
      }}
    >
      {!animated ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            position: "relative",
          }}
        >
          <div className={type === "red" ? styles.red : styles.black}></div>
          <Image
            className={styles.background}
            alt={alt}
            src={src}
            objectFit="cover"
            objectPosition={objectPosition}
            layout="fill"
            priority={priority}
            placeholder="blur"
            blurDataURL={src}
          />
          <div
            id={main ? styles.mainChildrenBox : styles.main}
            style={
              type === "article"
                ? {
                    paddingTop: "15vh",
                    paddingBottom: "15vh",
                  }
                : type === "special"
                ? {
                    paddingTop: "30vh",
                    paddingBottom: "30vh",
                  }
                : {}
            }
            className={styles.childBox}
          >
            {children}
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            position: "relative",
          }}
        >
          <div className={styles.black}></div>
          {!anim && (
            <Image
              className={styles.background}
              alt={alt}
              src={srcs[animatedBg]}
              objectFit="cover"
              objectPosition={objectPosition}
              layout="fill"
              priority={priority}
              placeholder="blur"
            />
          )}
          <div
            id={main ? styles.mainChildrenBox : styles.main}
            style={{
              minHeight: minHeight,
              padding: small ? "7% 0 7% 0" : "5% 0 5% 0",
            }}
            className={styles.childBox}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
