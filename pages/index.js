import { useState } from "react";
import styles from "../styles/Landing.module.css";
import { client, urlFor } from "../lib/client";
import { toast } from "react-toastify";
import { NextSeo } from "next-seo";
import Link from "next/link";
import mainBg from "../public/mainLBG.jpg";
import secondMainBg from "../public/giftBg.jpg";
import thirdMainBg from "../public/giftBg1.jpg";
import forthMainBg from "../public/giftBg2.jpg";
import fifthMainBg from "../public/giftBg3.jpg";
import power from "../public/giftBg6.jpg";
import footprint from "../public/footprinticon.svg";
import money from "../public/moneyIcon.svg";
import bill from "../public/billIcon.svg";
import solarCity from "../public/giftBg4.jpg";
import solarProducts from "../public/solarProducts.jpg";
import solarPanel from "../public/solarPanel.png";
import solarPanelCell from "../public/solarPanelCell.png";
import solarPanelBlack from "../public/solarPanelBlack.png";
import contactUs from "../public/contactUs.jpg";
import blogNews from "../public/giftBg5.jpg";
import instagram from "../public/Instagram.svg";
import facebook from "../public/Facebook.svg";
import twitter from "../public/Twitter.svg";
import linkedin from "../public/Linkedin.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { baseHost } from "../utils/seo";
import { Layout, Buttons, Inputs, Cards, Slider, EmailUs } from "../components";

export default function Home({ latestArticle }) {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleGetStarted = (e) => {
    e.preventDefault();
    if (email.length <= 0)
      return toast.info("You need to enter your email to get started");
    localStorage.setItem("getStartedEmail", JSON.stringify(email));
    setEmail("");
    router.push("signup");
    setTimeout(() => {
      localStorage.removeItem("getStartedEmail");
    }, 60000);
  };
  return (
    <>
      <NextSeo
        title="Gifty"
        description="The gifts shop where you can buy any present for your person!"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/logoWhite.svg",
          },
        ]}
        openGraph={{
          type: "website",
          url: `${baseHost}`,
          title: "Gifty",
          description:
            "The gifts shop where you can buy any present for your person!",
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
          site: `${baseHost}`,
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
      <div className={styles.wrapper}>
        <main>
          <Layout
            width="100%"
            height="100%"
            minHeight="380px"
            objectPosition="50% 70%"
            priority={true}
            animated={true}
            srcs={[mainBg, secondMainBg, thirdMainBg, forthMainBg, fifthMainBg]}
            alt="solarPowerLife"
          >
            <div className={styles.mainIntro}>
              <h1 className={styles.mainIntroTitle}>make someone a pleasant</h1>
              <p className={styles.mainIntroDescr}>
                Do you want to present something but don&apos;t know what would
                be a great gift for your person?
              </p>
              <h3 className={styles.mainIntroSubtitle}>
                Order any gift which you want right now!
              </h3>
              <form onSubmit={handleGetStarted} className={styles.mixedInput}>
                <div className={styles.mixedInputBlock}>
                  <Inputs.InputTwo
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    title="Your email address: "
                  />
                </div>
                <div className={styles.mixedInputBtn}>
                  <Buttons.Blue type="submit" text="get started" />
                </div>
              </form>
            </div>
          </Layout>
          <section className={styles.benefits}>
            <div className={styles.benefitsWrapper}>
              <div
                data-aos="fade-up"
                data-aos-delay="400"
                className={styles.benefit}
              >
                <div className={styles.benefitIcon}>
                  <Image
                    width={60}
                    height={60}
                    src={bill}
                    alt="solarBenefitBill"
                  />
                </div>
                <h4 className={styles.benefitTitle}>
                  Filter by your criterias
                </h4>
                <p className={styles.benefitDescr}>
                  Find gift by your options or mail us and we will suggest you
                </p>
              </div>
              <div data-aos="fade-up" className={styles.benefitsIntro}>
                <div className={styles.benefitBGWrapper}>
                  <div className={styles.benefitBG}>
                    <Image
                      width={250}
                      height={250}
                      src={power}
                      alt="solarBenefits"
                    />
                  </div>
                  <h2 className={styles.benefitsIntroTitle}>benefits</h2>
                </div>
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="400"
                className={styles.benefit}
              >
                <div className={styles.benefitIcon}>
                  <Image
                    width={65}
                    height={65}
                    src={footprint}
                    alt="solarBenefitsFootprint"
                  />
                </div>
                <h4 className={styles.benefitTitle}>
                  Get bonuses after orders
                </h4>
                <p className={styles.benefitDescr}>
                  Order any gift and you will recieve a bonus for your next
                  order
                </p>
              </div>
            </div>
            <div
              data-aos="fade-up"
              className={styles.benefit}
              id={styles.lastBenefit}
            >
              <div className={styles.benefitIcon}>
                <Image
                  width={60}
                  height={60}
                  src={money}
                  alt="solarBenefitMoney"
                />
              </div>
              <h4 className={styles.benefitTitle}>Cheap and effective</h4>
              <p className={styles.benefitDescr}>
                Buy presents on our store for cheap, save your money and make a
                pleasant for your person
              </p>
            </div>
            <div className={styles.benefitsWrapperMobile}>
              <div className={styles.benefitsIntro}>
                <div id={styles.benefitBGMobile} className={styles.benefitBG}>
                  <Image
                    width={250}
                    height={250}
                    src={power}
                    alt="solarBenefits"
                  />
                  <h2 className={styles.benefitsIntroTitle}>benefits</h2>
                </div>
              </div>
              <div id={styles.benefitMobile} className={styles.benefit}>
                <div className={styles.benefitIcon}>
                  <Image
                    width={60}
                    height={60}
                    src={bill}
                    alt="solarBenefitBill"
                  />
                </div>
                <h4 className={styles.benefitTitle}>
                  Filter by your criterias
                </h4>
                <p className={styles.benefitDescr}>
                  Find gift by your options or mail us and we will suggest you
                </p>
              </div>
              <div id={styles.benefitMobile} className={styles.benefit}>
                <div
                  style={{
                    minWidth: "60px",
                  }}
                  className={styles.benefitIcon}
                >
                  <Image
                    width={60}
                    height={60}
                    src={footprint}
                    alt="solarBenefitFootprint"
                  />
                </div>

                <h4 className={styles.benefitTitle}>
                  Get bonuses after orders
                </h4>
                <p className={styles.benefitDescr}>
                  Order any gift and you will recieve a bonus for your next
                  order
                </p>
              </div>
              <div className={styles.benefit} id={styles.lastBenefitMobile}>
                <div className={styles.benefitIcon}>
                  <Image
                    width={60}
                    height={60}
                    src={money}
                    alt="solarBenefitMoney"
                  />
                </div>
                <h4 className={styles.benefitTitle}>Cheap and effective</h4>
                <p className={styles.benefitDescr}>
                  Buy presents on our store for cheap, save your money and make
                  a pleasant for your person
                </p>
              </div>
            </div>
          </section>
          <section data-aos="fade-in" className={styles.explanation}>
            <Layout
              width="100%"
              height="100%"
              objectPosition="50% 40%"
              priority={false}
              animated={false}
              src={solarCity}
              alt="solarCity"
              type="special"
            >
              <div data-aos="fade-up" className={styles.explanationIntro}>
                <h3 className={styles.explanationIntroTitle}>
                  quick quotation
                </h3>
                <p className={styles.explanationIntroDescr}>
                  “Blessed are they who have the gift of making friends, for it
                  is one of God&apos;s best gifts. It involves many things, but
                  above all, the power of going out of one&apos;s self, and
                  appreciating whatever is noble and loving in another.”
                </p>
              </div>
            </Layout>
          </section>
          <section className={styles.productsSection}>
            <Layout
              width="100%"
              height="100%"
              objectPosition="50% 70%"
              priority={false}
              animated={false}
              src={solarProducts}
              alt="solarProducts"
              type="red"
            >
              <h2 className={styles.productsTitle}>our products</h2>
            </Layout>
            <div data-aos="fade-up" className={styles.slider}>
              <Slider.LandingSlider>
                <div className={styles.productItem}>
                  <Cards.LandingCard
                    title="New Year Tree"
                    descr="Very suitable present for New Year for your person"
                    src="https://cdn.sanity.io/images/a7ik6led/testing/fb9071e8291cdd4b6f28a9a51f2f37d7b24cd9cc-1188x1000.webp"
                    to="/products/new-year-tree"
                  />
                </div>
                <div className={styles.productItem}>
                  <Cards.LandingCard
                    title="Rose Bear"
                    descr="Rose bear which will be a great opportunity to express your feelings"
                    src="https://cdn.sanity.io/images/a7ik6led/testing/6d102ae7740a1a8aed7c7bf84872cf767596f9bf-1500x1471.jpg"
                    to="/products/rose-bear"
                  />
                </div>
                <div className={styles.productItem}>
                  <Cards.LandingCard
                    title="Halloween Duck"
                    descr="Cool Swinging Duck Car Hanging Ornament, Cute Halloween Car Decor "
                    src="https://cdn.sanity.io/images/a7ik6led/testing/76a655b20c4bc470951533b1b1cd301f34ebe2bd-1500x1409.jpg"
                    to="/products/halloween-duck"
                  />
                </div>
              </Slider.LandingSlider>
            </div>
          </section>
          <section className={styles.blogNews}>
            <Layout
              width="100%"
              height="100%"
              objectPosition="50% 70%"
              priority={false}
              animated={false}
              src={blogNews}
              alt="blogAndNews"
            >
              <h2 data-aos="fade-up" className={styles.contactUsTitle}>
                blog & news
              </h2>
              <div data-aos="fade-up" className={styles.contactUsVariants}>
                <div className={styles.contactUsVariant}>
                  <div className={styles.socialMediaList}>
                    <div className={styles.socialMedia}>
                      <Link href="/">
                        <a>
                          <Image
                            width={60}
                            height={60}
                            src={instagram}
                            alt="instagram"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className={styles.socialMedia}>
                      <Link href="/">
                        <a>
                          <Image
                            width={60}
                            height={60}
                            src={facebook}
                            alt="facebook"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className={styles.socialMedia}>
                      <Link href="/">
                        <a>
                          <Image
                            width={60}
                            height={60}
                            src={linkedin}
                            alt="linkedin"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className={styles.socialMedia}>
                      <Link href="/">
                        <a>
                          <Image
                            width={60}
                            height={60}
                            src={twitter}
                            alt="twitter"
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                  <p
                    id={styles.blogDescr}
                    className={styles.contactUsVariantDescr}
                  >
                    We make a blog not only on our social media, but on our shop
                    too so you can collect useful information for you and be
                    aware of current gift trends
                  </p>
                  <div
                    style={{ maxWidth: "150px" }}
                    className={styles.contactUsVariantBtn}
                  >
                    <Buttons.Blue to="/blog-news" text="check it" />
                  </div>
                </div>
                <div className={styles.contactUsVariant}>
                  <div className={styles.latestArticleBox}>
                    <h3
                      id={styles.blogVariantTitle}
                      className={styles.contactUsVariantTitle}
                    >
                      latest article
                    </h3>
                    <Link href={`/blog-news/${latestArticle.slug.current}`}>
                      <div className={styles.lastArticlePreview}>
                        <Image
                          src={urlFor(
                            latestArticle.image && latestArticle.image
                          ).url()}
                          width={50}
                          height={30}
                          layout="responsive"
                          alt={latestArticle?.title}
                        />
                        <div className={styles.blackLastArticlePreview}>
                          <h3 className={styles.blackLastArticlePreviewTitle}>
                            {latestArticle?.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </Layout>
          </section>
          <section className={styles.contactUs}>
            <Layout
              width="100%"
              height="100%"
              objectPosition="50% 70%"
              priority={false}
              animated={false}
              src={contactUs}
              alt="contactUs"
            >
              <h2 className={styles.contactUsTitle}>
                do you have any questions?
              </h2>
              <div data-aos="fade-up" className={styles.contactUsVariants}>
                <div className={styles.contactUsVariant}>
                  <h3 className={styles.contactUsVariantTitle}>q&a</h3>
                  <p className={styles.contactUsVariantDescr}>
                    Go to our Q&A page and find your question in “frequently
                    asked questions” or email us for yours
                  </p>
                  <div className={styles.contactUsVariantBtn}>
                    <Buttons.Blue
                      to="/questions-and-answers"
                      text="go to the q&a page"
                    />
                  </div>
                </div>
                <h3 className={styles.or}>or</h3>
                <div className={styles.emailForm}>
                  <EmailUs title="email us" />
                </div>
              </div>
            </Layout>
          </section>
        </main>
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  const query = '*[_type == "article"] | order(_createdAt desc)[0]';
  const latestArticle = await client.fetch(query);

  return {
    props: { latestArticle },
  };
};
