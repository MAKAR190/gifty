import { useEffect, useRef, useState } from "react";
import { Badge } from "@mui/material";
import { useStateContext } from "../../context/StateContext";
import styles from "./Header.module.css";
import Image from "next/image";
import Logo from "../../public/Logo.svg";
import Profile from "../../public/profile.png";

import Link from "next/link";
import burger from "../../public/burger.svg";
import close from "../../public/close.png";
import arrowDown from "../../public/arrowDown.png";
import { connect } from "react-redux";
import selectors from "../../redux/auth/selectors";
import operations from "../../redux/auth/operations";
import Loader from "../Loader/Loader";
import { useRouter } from "next/router";

const Header = ({ isAuthenticated, logOut, loading }) => {
  const [showImage, setShowImage] = useState(false);
  const [mobileMenu, showMobileMenu] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showProfileBox, setShowProfileBox] = useState(false);
  const [src, setSrc] = useState(null);
  const [productUrl, setProductUrl] = useState(null);
  const navRef = useRef(null);
  const signUpRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    showMobileMenu(false);
  }, [router.asPath]);
  const handleScroll = (e) => {
    if (window.innerWidth > 1024 && window.innerWidth < 2300) {
      if (
        typeof window !== "undefined" &&
        window.scrollY > navRef.current.clientHeight
      ) {
        navRef.current.style.maxHeight = "90px";
        navRef.current.style.minHeight = "90px";
        if (!isAuthenticated) {
          signUpRef.current.style.maxHeight = "90px";
          signUpRef.current.style.minHeight = "90px";
        }
      } else {
        navRef.current.style.maxHeight = "100px";
        navRef.current.style.minHeight = "100px";
        if (!isAuthenticated) {
          signUpRef.current.style.maxHeight = "100px";
          signUpRef.current.style.minHeight = "100px";
        }
      }
    } else if (window.innerWidth > 2300) {
      if (
        typeof window !== "undefined" &&
        window.scrollY > navRef.current.clientHeight
      ) {
        navRef.current.style.maxHeight = "140px";
        navRef.current.style.minHeight = "140px";
        if (!isAuthenticated) {
          signUpRef.current.style.maxHeight = "140px";
          signUpRef.current.style.minHeight = "140px";
        }
      } else {
        navRef.current.style.maxHeight = "150px";
        navRef.current.style.minHeight = "150px";
        if (!isAuthenticated) {
          signUpRef.current.style.maxHeight = "150px";
          signUpRef.current.style.minHeight = "150px";
        }
      }
    }
  };
  const { cartItems } = useStateContext();
  return (
    <>
      <header ref={navRef} className={styles.wrapper}>
        <div className={styles.logo}>
          <div className={styles.mobileLogoWrapper}>
            <Link href="/">
              <a>
                <Image
                  placeholder="blur"
                  blurDataURL={Logo}
                  style={{ cursor: "pointer" }}
                  src={Logo}
                  alt="solarPowerLife"
                  width={300}
                  height={300}
                />
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.mobileMenu}>
          <Image
            onClick={() => showMobileMenu(true)}
            src={burger}
            alt="mobileMenu"
            width={40}
            height={40}
          />
        </div>
        <div className={styles.navigationDesktop}>
          <div className={styles.navigationDesktopLink}>
            <Link href="/">About Us</Link>
          </div>
          <div
            id={styles.hoverBlockId}
            className={styles.navigationDesktopLink}
          >
            <Link className={styles.navigationDesktopLink} href="/products">
              Products
            </Link>
            <div className={styles.hoverBlock}>
              <div className={styles.productsList}>
                <div
                  onMouseEnter={(e) => {
                    setShowImage(true);
                    setSrc(
                      "https://cdn.sanity.io/images/a7ik6led/testing/fb9071e8291cdd4b6f28a9a51f2f37d7b24cd9cc-1188x1000.webp"
                    );
                    setProductUrl(`new-year-tree`);
                  }}
                  onMouseLeave={() => setShowImage(false)}
                  className={styles.productItem}
                >
                  <Link href={`/products/new-year-tree`}>New Year Tree</Link>
                </div>
                <div
                  onMouseEnter={(e) => {
                    setShowImage(true);
                    setSrc(
                      "https://cdn.sanity.io/images/a7ik6led/testing/6d102ae7740a1a8aed7c7bf84872cf767596f9bf-1500x1471.jpg"
                    );
                    setProductUrl(`rose-bear`);
                  }}
                  onMouseLeave={() => setShowImage(false)}
                  className={styles.productItem}
                >
                  <Link href={`/products/rose-bear`}>Rose Bear</Link>
                </div>
                <div
                  onMouseEnter={(e) => {
                    setShowImage(true);
                    setSrc(
                      "https://cdn.sanity.io/images/a7ik6led/testing/770bcc99d960780aa801eb26f7b6873e73731046-1169x1353.jpg"
                    );
                    setProductUrl(`lemon-bear-plush`);
                  }}
                  onMouseLeave={() => setShowImage(false)}
                  className={styles.productItem}
                >
                  <Link href={`/products/lemon-bear-plush`}>
                    Lemon Bear Plush
                  </Link>
                </div>
                <div
                  onMouseEnter={(e) => {
                    setShowImage(true);
                    setSrc(
                      "https://cdn.sanity.io/images/a7ik6led/testing/76a655b20c4bc470951533b1b1cd301f34ebe2bd-1500x1409.jpg"
                    );
                    setProductUrl(`halloween-duck`);
                  }}
                  onMouseLeave={() => setShowImage(false)}
                  className={styles.productItem}
                >
                  <Link href={`/products/halloween-duck`}>Halloween Duck</Link>
                </div>
              </div>
              <div
                style={showImage ? { opacity: 1, visibility: "visible" } : {}}
                onMouseEnter={() => setShowImage(true)}
                onMouseLeave={() => setShowImage(false)}
                className={styles.image}
              >
                <Link href={productUrl ? "/products/" + productUrl : "/"}>
                  {src === null ? (
                    <div />
                  ) : (
                    <Image width={200} height={200} src={src} />
                  )}
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.navigationDesktopLink}>
            <Link className={styles.navigationDesktopLink} href="/contact-us">
              Contact Us
            </Link>
          </div>
          <div className={styles.navigationDesktopLink}>
            <Link
              className={styles.navigationDesktopLink}
              href="/questions-and-answers"
            >
              Q&A
            </Link>
          </div>
          <div className={styles.navigationDesktopLink}>
            <Link className={styles.navigationDesktopLink} href="/blog-news">
              Blog & News
            </Link>
          </div>
        </div>
        {isAuthenticated ? (
          <div className={styles.profile}>
            <div className={styles.profileIcon}>
              <Link href="/profile">
                <Badge
                  sx={{
                    "& .MuiBadge-badge": {
                      right: `${5}%`,
                      top: `${17}%`,
                    },
                  }}
                  badgeContent={cartItems?.length}
                  color="secondary"
                >
                  <Image
                    style={{
                      cursor: "pointer",
                    }}
                    src={Profile}
                    onMouseEnter={() => setShowProfileBox(true)}
                    onMouseLeave={() => setShowProfileBox(false)}
                    alt="profile"
                    placeholder="blur"
                    blurDataURL={Profile}
                    width={100}
                    height={100}
                  />
                </Badge>
              </Link>
              <div
                style={
                  showProfileBox ? { opacity: 1, visibility: "visible" } : {}
                }
                onMouseEnter={() => setShowProfileBox(true)}
                onMouseLeave={() => setShowProfileBox(false)}
                className={styles.profileHoverBox}
              >
                <div className={styles.profileHoverBoxItem}>
                  <Link href="/profile">Details</Link>
                </div>
                <div id={styles.cart} className={styles.profileHoverBoxItem}>
                  <Link href="/cart">Cart</Link>
                </div>
                <div id={styles.logOut} className={styles.profileHoverBoxItem}>
                  <div
                    onClick={() => {
                      logOut();
                    }}
                  >
                    Log Out
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.actions}>
            <div className={styles.paragraph}>
              <Link href="/login">Log In</Link>
            </div>
            <div ref={signUpRef} className={styles.signUp}>
              <Link href="/signup">Sign Up</Link>
            </div>
          </div>
        )}
      </header>
      {mobileMenu && (
        <div className={styles.mobileMenuWrapper}>
          <div className={styles.mobileMenuBox}>
            <div className={styles.mobileClose}>
              <Image
                onClick={() => showMobileMenu(false)}
                src={close}
                alt="closeMenu"
                width={60}
                height={60}
              />
            </div>
            <div
              style={showDetails ? { justifyContent: "normal" } : {}}
              className={styles.mobileNavigation}
            >
              <div className={styles.mobileNavigationItem}>
                <Link href="/">About Us</Link>
              </div>
              <div
                id={styles.detailsId}
                className={styles.mobileNavigationItem}
              >
                <Link href="/products">Products</Link>
                <div className={styles.arrowDown}>
                  <Image
                    style={
                      showDetails
                        ? {
                            transform: "rotate(180deg)",
                            transition: "0.5s",
                          }
                        : { transform: "rotate(0deg)", transition: "0.5s" }
                    }
                    onTouchStart={() => setShowDetails((prev) => !prev)}
                    src={arrowDown}
                    alt="arrowDown"
                    width={20}
                    height={10}
                  />
                </div>
              </div>
              {showDetails && (
                <div className={styles.detailedMenu}>
                  <div id={styles.detailed}>
                    <Link href="/products/lemon-bear-plush">
                      Lemon Bear Plush
                    </Link>
                  </div>
                  <div id={styles.detailed}>
                    <Link href="/products/halloween-duck">Halloween Duck</Link>
                  </div>
                  <div id={styles.detailed}>
                    <Link href="/products/rose-bear">Rose Bear</Link>
                  </div>
                </div>
              )}
              <div className={styles.mobileNavigationItem}>
                <Link href="/contact-us">Contact Us</Link>
              </div>
              <div className={styles.mobileNavigationItem}>
                <Link href="/questions-and-answers">Q&A</Link>
              </div>
              <div className={styles.mobileNavigationItem}>
                <Link href="/blog-news">Blog & News</Link>
              </div>
              <div
                id={styles.cartMobileLink}
                className={styles.mobileNavigationItem}
              >
                <Link href="/cart">Cart</Link>
              </div>
              {isAuthenticated && (
                <div
                  id={styles.logOutMobile}
                  onClick={() => {
                    logOut();
                    showMobileMenu(false);
                  }}
                  className={styles.mobileNavigationItem}
                >
                  Log Out
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {loading && <Loader />}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
  loading: selectors.getLoading(state),
});

export default connect(mapStateToProps, {
  logOut: operations.logOut,
})(Header);
