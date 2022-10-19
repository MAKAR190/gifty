import { Layout, EmailUs, Title } from "../components";
import mainBg from "../public/MainLBG.jpg";
import styles from "../styles/ContactUs.module.css";
import instagram from "../public/Instagram.svg";
import facebook from "../public/Facebook.svg";
import twitter from "../public/Twitter.svg";
import linkedin from "../public/Linkedin.svg";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { baseHost } from "../utils/seo";

const ContactUs = () => {
  return (
    <>
      <NextSeo
        title="Contact with Gifty"
        description="Our shop always opened to you - you can contact us on social media or by email"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/logoWhite.svg",
          },
        ]}
        openGraph={{
          type: "website",
          url: `${baseHost}/contact-us`,
          title: "Contact with Gifty",
          description:
            "Our shop always opened to you - you can contact us on social media or by email",
          images: [
            {
              url: "/logoWhite.svg",
              width: 800,
              height: 600,
              alt: "Gifty",
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: `${baseHost}/contact-us`,
          cardType: "summary_large_image",
        }}
        robotsProps={{
          nosnippet: true,
          notranslate: true,
          noimageindex: true,
          noarchive: true,
          maxSnippet: -1,
          maxImagePreview: "none",
          maxVideoPreview: -1,
        }}
      />
      <main>
        <div className={styles.wrapperDesktop}>
          <Layout
            width="100%"
            height="100%"
            objectPosition="50% 70%"
            priority={true}
            animated={false}
            src={mainBg}
            alt="contactUs"
          >
            <h1 className={styles.title}>how can you contact us?</h1>
            <div data-aos="fade-up" className={styles.contactBox}>
              <div className={styles.emailBox}>
                <h2 className={styles.mediaTitle}>email us</h2>
                <EmailUs />
              </div>
              <div data-aos="fade-up" className={styles.media}>
                <h2 className={styles.mediaTitle}>find us on media</h2>
                <div className={styles.mediaBox}>
                  <div className={styles.mediaBoxItem}>
                    <a>
                      <Image
                        placeholder="blur"
                        blurDataURL={instagram}
                        width="100px"
                        height="100px"
                        src={instagram}
                        alt="instagram"
                      />
                    </a>
                  </div>
                  <div className={styles.mediaBoxItem}>
                    <a>
                      <Image
                        placeholder="blur"
                        blurDataURL={facebook}
                        width="100px"
                        height="100px"
                        src={facebook}
                        alt="facebook"
                      />
                    </a>
                  </div>
                  <div className={styles.mediaBoxItem}>
                    <a>
                      <Image
                        placeholder="blur"
                        blurDataURL={twitter}
                        width="100px"
                        height="100px"
                        src={twitter}
                        alt="twitter"
                      />
                    </a>
                  </div>
                  <div className={styles.mediaBoxItem}>
                    <a>
                      <Image
                        placeholder="blur"
                        blurDataURL={linkedin}
                        width="100px"
                        height="100px"
                        src={linkedin}
                        alt="linkedIn"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        </div>
        <div className={styles.wrapperMobile}>
          <Layout
            width="100%"
            height="100%"
            objectPosition="50% 70%"
            priority={false}
            animated={false}
            src={mainBg}
            alt="contactUs"
          >
            <h1 className={styles.title}>how can you contact us?</h1>
            <div className={styles.contactBox}>
              <div className={styles.emailBox}>
                <EmailUs title="Email Us" padding="10%" />
              </div>
            </div>
          </Layout>
          <div className={styles.media}>
            <Title title="find us on media" />
            <div className={styles.mediaBox}>
              <div className={styles.mediaBoxItem}>
                <a>
                  <Image
                    placeholder="blur"
                    blurDataURL={instagram}
                    width="100px"
                    height="100px"
                    src={instagram}
                    alt="instagram"
                  />
                </a>
              </div>
              <div className={styles.mediaBoxItem}>
                <a>
                  <Image
                    placeholder="blur"
                    blurDataURL={facebook}
                    width="100px"
                    height="100px"
                    src={facebook}
                    alt="facebook"
                  />
                </a>
              </div>
              <div className={styles.mediaBoxItem}>
                <a>
                  <Image
                    placeholder="blur"
                    blurDataURL={twitter}
                    width="100px"
                    height="100px"
                    src={twitter}
                    alt="twitter"
                  />
                </a>
              </div>
              <div className={styles.mediaBoxItem}>
                <a>
                  <Image
                    placeholder="blur"
                    blurDataURL={linkedin}
                    width="100px"
                    height="100px"
                    src={linkedin}
                    alt="linkedIn"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactUs;
