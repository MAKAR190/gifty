import { Layout, EmailUs, Title } from "../components";
import qaa from "../public/giftBg1.jpg";
import styles from "../styles/qAa.module.css";
import ContactUs from "../public/contactUs.jpg";
import { NextSeo, FAQPageJsonLd } from "next-seo";
import { qAaJsonLd, baseHost } from "../utils/seo";
const QuestionsAndAnswers = () => {
  return (
    <>
      <NextSeo
        title="Frequently asked questions - Gifty"
        description="Do you have any questions about our products? Here we asked on the most common questions, but if you didn&apos;t find your question - email us"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/logoWhite.svg",
          },
        ]}
        openGraph={{
          type: "website",
          url: `${baseHost}/questions-and-answers`,
          title: "Frequently asked questions - Gifty",
          description:
            "Do you have any questions about our products? Here we asked on the most common questions, but if you didn&apos;t find your question - email us",
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
          site: `${baseHost}/questions-and-answers`,
          cardType: "summary_large_image",
        }}
        robotsProps={{
          nosnippet: false,
          notranslate: true,
          noimageindex: true,
          noarchive: true,
          maxSnippet: -1,
          maxImagePreview: "none",
          maxVideoPreview: -1,
        }}
      />
      <FAQPageJsonLd mainEntity={qAaJsonLd} />

      <main>
        <div className={styles.wrapper}>
          <Layout
            width="100%"
            height="100%"
            objectPosition="50% 70%"
            priority={true}
            animated={false}
            src={qaa}
          >
            <h1 className={styles.mainTitle}>q&a</h1>
          </Layout>
          <Title title="frequently asked questions" />
          <div className={styles.questions}>
            <div className={styles.question}>
              <details className={styles.details}>
                <summary>
                  <p>Can i ask for gift suggestion by emailing you for free?</p>
                </summary>
                <div>
                  Yes, it is absolutely free and we will write you in the
                  maximum of 2 work days
                </div>
              </details>
            </div>
            <div className={styles.question}>
              <details className={styles.details}>
                <summary>
                  <p>Can I return or refuse my order?</p>
                </summary>
                <div>
                  Yes, your money will be back imidiately! But this works only
                  during 7 days from ordering gift
                </div>
              </details>
            </div>
            <div className={styles.question}>
              <details className={styles.details}>
                <summary>
                  <p>How does your criterias work?</p>
                </summary>
                <div>
                  You can search any gift by title, material filters, colors,
                  gender, age, etc.
                </div>
              </details>
            </div>
            <div className={styles.question}>
              <details className={styles.details}>
                <summary>
                  <p>How many time is the average shipping?</p>
                </summary>
                <div>Minimum 2 days and maximum 5</div>
              </details>
            </div>
            <div className={styles.question}>
              <details className={styles.details}>
                <summary>
                  <p>How Gifty Saves Money?</p>
                </summary>
                <div>
                  You can recieve bonuses from orders and also our website
                  presents the cheapiets and high quality varianats for you
                </div>
              </details>
            </div>
            <div className={styles.question}>
              <details className={styles.details}>
                <summary>
                  <p>
                    Why gift is the most effective way to show your feelings?
                  </p>
                </summary>
                <div>
                  “Blessed are they who have the gift of making friends, for it
                  is one of God&apos;s best gifts. It involves many things, but above
                  all, the power of going out of one&apos;s self, and appreciating
                  whatever is noble and loving in another.”
                </div>
              </details>
            </div>
          </div>
          <Layout
            width="100%"
            height="100%"
            objectPosition="50% 70%"
            priority={false}
            animated={false}
            src={ContactUs}
          >
            <div className={styles.emailForm}>
              <h2 className={styles.emailTitle}>
                didn&apos;t find your question?
              </h2>
              <h3 data-aos="fade-up" className={styles.emailTitle}>
                email us
              </h3>
              <div data-aos="fade-up">
                <EmailUs />
              </div>
            </div>
          </Layout>
        </div>
      </main>
    </>
  );
};

export default QuestionsAndAnswers;
