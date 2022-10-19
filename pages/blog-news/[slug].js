import { client, urlFor } from "../../lib/client";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { Layout, Title, Buttons } from "../../components";
import clock from "../../public/clock.svg";
import Facebook from "../../public/Facebook.svg";
import Twitter from "../../public/Twitter.svg";
import styles from "../../styles/Article.module.css";
import parentStyles from "../../styles/BlogNews.module.css";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import Image from "next/image";
import { baseHost } from "../../utils/seo";
import { createReadableDate } from "../../utils/date";

const Article = ({ article, articles }) => {
  const related = articles
    .filter((el) => el.title !== article?.title)
    .sort(
      (a, b) =>
        Date.parse(new Date(b._createdAt)) - Date.parse(new Date(a._createdAt))
    )
    .slice(0, 3);
  return (
    <>
      {article && (
        <>
          <NextSeo
            title={article.title}
            description={article.shortDescription}
            additionalLinkTags={[
              {
                rel: "icon",
                href: urlFor(article?.image && article.image).url(),
              },
            ]}
            openGraph={{
              type: "article",
              url: `${baseHost}/products/${article.slug.current}`,
              title: article.title,
              description: article.shortDescription,
              images: [
                {
                  url: urlFor(article?.image && article.image).url(),
                  width: 800,
                  height: 600,
                  alt: article.title,
                },
              ],
            }}
            twitter={{
              handle: "@handle",
              site: `${baseHost}/products/${article.slug.current}`,
              cardType: "summary_large_image",
            }}
            robotsProps={{
              nosnippet: false,
              notranslate: true,
              noimageindex: false,
              noarchive: true,
              maxSnippet: -1,
              maxImagePreview: "none",
              maxVideoPreview: -1,
            }}
          />
          <ArticleJsonLd
            url={`${baseHost}/products/${article.slug.current}`}
            title={article.title}
            images={[urlFor(article?.image && article.image).url()]}
            datePublished={article._createdAt}
            dateModified={article._updatedAt}
            publisherName="Gifty"
            publisherLogo="/logoWhite.svg"
            description={article.shortDescription}
          />
        </>
      )}
      <main className={styles.articleWrapper}>
        <Layout
          width="100%"
          height="100%"
          objectPosition="50% 70%"
          priority={true}
          animated={false}
          src={urlFor(article.image && article.image).url()}
          type="article"
          alt={article.title}
        >
          <h1 className={styles.mainTitle}>{article.title}</h1>
        </Layout>
        <div className={styles.contentBox}>
          <PortableText value={article.description} />
          <div
            style={{
              top: "1.2%",
            }}
            className={parentStyles.dateWrapper}
          >
            <div className={parentStyles.clockIcon}>
              <Image src={clock} />
            </div>
            <p style={{ fontWeight: 500 }} className={parentStyles.date}>
              {createReadableDate(article)}
            </p>
          </div>
          <div className={styles.mediaShareBox}>
            <div className={styles.shareBtn}>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${
                  typeof window !== "undefined" && window.location.href
                }`}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={Facebook}
                  placeholder="blur"
                  blurDataURL={Facebook}
                  alt="shareToFacebook"
                />
              </a>
            </div>
            <div className={styles.shareBtn}>
              <a
                href={`https://twitter.com/intent/tweet?url=${
                  typeof window !== "undefined" && window.location.href
                }&text=\n${article.shortDescription}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={Twitter}
                  placeholder="blur"
                  blurDataURL={Twitter}
                  alt="shareToTwitter"
                />
              </a>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <>
            <Title title="other news" />
            <div className={parentStyles.news}>
              {related.map((article) => (
                <div key={article._id} className={parentStyles.newsItem}>
                  <div className={parentStyles.newsInfo}>
                    <div className={parentStyles.preview}>
                      <Link href={`/blog-news/${article.slug.current}`}>
                        <a>
                          <Image
                            height="45%"
                            width="70%"
                            layout="responsive"
                            objectFit="cover"
                            src={urlFor(article.image && article.image).url()}
                            objectPosition="center"
                            placeholder="blur"
                            blurDataURL={urlFor(
                              article.image && article.image
                            ).url()}
                            alt={article.title}
                          />
                        </a>
                      </Link>
                    </div>
                    <div className={parentStyles.info}>
                      <Link href="/news">
                        <h3 className={parentStyles.infoTitle}>
                          {article.title}
                        </h3>
                      </Link>
                      <p className={parentStyles.shortDescr}>
                        {article.shortDescription}
                      </p>
                      <div className={parentStyles.infoBtn}>
                        <Buttons.Blue
                          to={`/blog-news/${article.slug.current}`}
                          text="more"
                        />
                      </div>
                      <div className={parentStyles.dateWrapper}>
                        <div className={parentStyles.clockIcon}>
                          <Image src={clock} alt="date" />
                        </div>
                        <p className={parentStyles.date}>
                          {createReadableDate(article)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className={styles.moreBtn}>
          <Buttons.Blue to="/blog-news" text="more news" />
        </div>
      </main>
    </>
  );
};
export const getServerSideProps = async ({ params: { slug } }) => {
  const query = `*[_type == "article" && slug.current == '${slug}'][0]`;
  const articlesQuery = '*[_type == "article"]';

  const article = await client.fetch(query);
  const articles = await client.fetch(articlesQuery);

  return {
    props: { articles, article },
  };
};
export default Article;
