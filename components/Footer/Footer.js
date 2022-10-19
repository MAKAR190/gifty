import { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import Logo from "../../public/Logo.svg";
import email from "../../public/email.svg";
import instagram from "../../public/Instagram.svg";
import facebook from "../../public/Facebook.svg";
import twitter from "../../public/Twitter.svg";
import linkedin from "../../public/Linkedin.svg";
import phone from "../../public/phone.svg";
import hotArrow from "../../public/tagArrow.png";
import Image from "next/image";
import Buttons from "../Buttons/Buttons";
import Inputs from "../Inputs/Inputs";
import Link from "next/link";
import plus from "../../public/plusIconFooter.svg";

const Footer = () => {
  const [showDetailsProducts, setShowDetailsProducts] = useState(true);
  const [showDetailsTags, setShowDetailsTags] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setShowDetailsProducts(false);
        setShowDetailsTags(false);
      } else {
        return;
      }
    }
  }, []);
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div id={styles.first} className={styles.column}>
          <div className={styles.logo}>
            <Link href="/">
              <a>
                <Image
                  placeholder="blur"
                  blurDataURL={Logo}
                  src={Logo}
                  alt="solarPowerLife"
                  width={250}
                  height={100}
                />
              </a>
            </Link>
          </div>
          <p className={styles.paragraph}>
            Want to receive news and useful things? Subscribe and we welcome you
            to tell us what you think.
          </p>
          <div className={styles.mixedInput}>
            <div className={styles.input}>
              <Inputs.InputOne title="Your email address:" />
            </div>
            <div className={styles.btn}>
              <Buttons.Blue height={100 + "%"} text="subscribe" />
            </div>
          </div>
        </div>
        <div id={styles.second} className={styles.column}>
          <div className={styles.textWrapper}>
            <div className={styles.mobileDetailsWrapper}>
              <h3 className={styles.title}>hot tags</h3>
              <div className={styles.showDetails}>
                <Image
                  src={plus}
                  style={
                    showDetailsTags
                      ? {
                          transform: "rotate(45deg)",
                          transition: "0.5s",
                        }
                      : { transform: "rotate(0deg)", transition: "0.5s" }
                  }
                  onTouchStart={() => setShowDetailsTags((prev) => !prev)}
                  alt="show"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            {showDetailsTags && (
              <div className={styles.detailedMenu}>
                <div className={styles.desktopLinksWrapper}>
                  <div className={styles.linkedParagraph}>
                    <Link href="/products/new-year-tree">New Year Tree</Link>
                    <div className={styles.hotArrow}>
                      <Image
                        width={14}
                        height={16}
                        src={hotArrow}
                        alt="arrowRight"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.desktopLinksWrapper}>
                  <div className={styles.linkedParagraph}>
                    <Link href="/products">Products</Link>
                    <div className={styles.hotArrow}>
                      <Image
                        width={14}
                        height={16}
                        src={hotArrow}
                        alt="arrowRight"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.desktopLinksWrapper}>
                  <div className={styles.linkedParagraph}>
                    <Link href="/questions-and-answers">Q&A</Link>
                    <div className={styles.hotArrow}>
                      <Image
                        width={14}
                        height={16}
                        src={hotArrow}
                        alt="arrowRight"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.desktopLinksWrapper}>
                  <div className={styles.linkedParagraph}>
                    <Link href="/blog-news">Blog & News</Link>
                    <div className={styles.hotArrow}>
                      <Image
                        width={14}
                        height={16}
                        src={hotArrow}
                        alt="arrowRight"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div id={styles.third} className={styles.column}>
          <div className={styles.textWrapper}>
            <div className={styles.mobileDetailsWrapper}>
              <h3 className={styles.title}>products</h3>
              <div className={styles.showDetails}>
                <Image
                  src={plus}
                  onTouchStart={() => setShowDetailsProducts((prev) => !prev)}
                  style={
                    showDetailsProducts
                      ? {
                          transform: "rotate(45deg)",
                          transition: "0.5s",
                        }
                      : { transform: "rotate(0deg)", transition: "0.5s" }
                  }
                  alt="show"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            {showDetailsProducts && (
              <div className={styles.detailedMenu}>
                <div className={styles.desktopLinksWrapper}>
                  <div className={styles.linkedParagraph}>
                    <Link href="/products/new-year-tree">New Year Tree</Link>
                    <div className={styles.hotArrow}>
                      <Image
                        width={14}
                        height={16}
                        src={hotArrow}
                        alt="arrowRight"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.desktopLinksWrapper}>
                  <div className={styles.linkedParagraph}>
                    <Link href="/products/rose-bear">Rose Bear</Link>
                    <div className={styles.hotArrow}>
                      <Image
                        width={14}
                        height={16}
                        src={hotArrow}
                        alt="arrowRight"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.desktopLinksWrapper}>
                  <div className={styles.linkedParagraph}>
                    <Link href="/products/lemon-bear-plush">
                      Lemon Bear Plush
                    </Link>
                    <div className={styles.hotArrow}>
                      <Image
                        width={14}
                        height={16}
                        src={hotArrow}
                        alt="arrowRight"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.desktopLinksWrapper}>
                  <div className={styles.linkedParagraph}>
                    <Link href="/products/halloween-duck">Halloween Duck</Link>
                    <div className={styles.hotArrow}>
                      <Image
                        width={14}
                        height={16}
                        src={hotArrow}
                        alt="arrowRight"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div id={styles.forth} className={styles.column}>
          <div className={styles.phone}>
            <div className={styles.phoneIcon}>
              <Image width={40} height={40} src={phone} alt="phone" />
            </div>
            <h3 className={styles.title}>123456789</h3>
          </div>
          <div className={styles.mediaList}>
            <div className={styles.mediaItem}>
              <Image
                placeholder="blur"
                blurDataURL={instagram}
                src={instagram}
                alt="instagram"
                width={60}
                height={60}
              />
            </div>
            <div className={styles.mediaItem}>
              <Image
                placeholder="blur"
                blurDataURL={facebook}
                src={facebook}
                alt="facebook"
                width={60}
                height={60}
              />
            </div>
            <div className={styles.mediaItem}>
              <Image
                placeholder="blur"
                blurDataURL={twitter}
                src={twitter}
                alt="twitter"
                width={60}
                height={60}
              />
            </div>
            <div className={styles.mediaItem}>
              <Image
                placeholder="blur"
                blurDataURL={linkedin}
                src={linkedin}
                alt="linkedIn"
                width={60}
                height={60}
              />
            </div>
            <div className={styles.mediaItem}>
              <Image
                placeholder="blur"
                blurDataURL={email}
                src={email}
                alt="email"
                width={60}
                height={60}
              />
            </div>
          </div>
          <div className={styles.pageLinks}>
            <Link href="/about-us">About Us</Link> |{" "}
            <Link href="/products">Products</Link> |{" "}
            <Link href="/contact-us">Contact Us</Link> |{" "}
            <Link href="/questions-and-answers">Q&A</Link> |{" "}
            <Link href="/blog-news">Blog & News</Link>
          </div>
          <div className={styles.copyright}>
            @2022 Gifty. All Rights Reserved | <Link href="/">XML</Link> |{" "}
            <Link href="/">Privacy Policy</Link>
          </div>
        </div>
      </div>
      <div className={styles.copyrightMobile}>
        @2022 Gifty. All Rights Reserved | <Link href="/">XML</Link> |{" "}
        <Link href="/">Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default Footer;
