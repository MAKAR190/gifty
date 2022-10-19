import { Layout, Buttons } from "../components";
import styles from "../styles/notFound.module.css";
import bg from "../public/giftBg1.jpg";
import { NextSeo } from "next-seo";
import withNoSSR from "../hoc/withNoSSR";


const NotFoundPage = () => {
  return (
    <>
      <NextSeo
        title="404 - Gifty"
        description="Page was not found"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/logoWhite.svg",
          },
        ]}
        nofollow={true}
      />
      <div className={styles.wrapper}>
        <Layout
          width="100%"
          height="100%"
          objectPosition="50% 70%"
          priority={true}
          animated={false}
          src={bg}
        >
          <h1 className={styles.mainTitle}>power your home with the sun</h1>
        </Layout>
        <div className={styles.notFoundBox}>
          <h2 className={styles.notFoundTitle}>404</h2>
          <p className={styles.notFoundDescr}>Page was not found...</p>
          <div className={styles.notFoundBtn}>
            <Buttons.Black to="/" caps={false} text="To main page" />
          </div>
        </div>
      </div>
    </>
  );
};

export default withNoSSR(NotFoundPage);
