import { useState, useEffect } from "react";
import styles from "../styles/BlogNews.module.css";
import { NextSeo } from "next-seo";
import { Layout, Inputs, Title, Buttons, Loader } from "../components";
import newsSolarBG from "../public/giftBg5.jpg";
import Image from "next/image";
import clock from "../public/clock.svg";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { client, urlFor } from "../lib/client";
import { useRouter } from "next/router";
import { baseHost } from "../utils/seo";
import { createReadableDate } from "../utils/date";


const BlogNews = ({ articles, categories }) => {
  const [items, setItems] = useState(articles);
  const [hasMore, setHasMore] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState({});
  const [reqQuery, setReqQuery] = useState(
    `*[_type == "article"] | order(_createdAt desc)`
  );
  const router = useRouter();
  const splittedCategories = categories.map((category) => ({
    value: category.title.charAt(0).toLowerCase() + category.title.slice(1),
    label: category.title,
    id: category.title,
  }));
  const getMorePost = async () => {
    const query = `${reqQuery}[${items.length}...${items.length + 10}]`;

    const newArticles = await client.fetch(query);
    if (newArticles.length > 0) {
      setItems((items) => [...items, ...newArticles]);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    setSearchValue(router.query?.search);
    if (router.query && router.query.category) {
      setCategory({
        value: router.query.category,
        label:
          router.query.category.charAt(0).toUpperCase() +
          router.query.category.slice(1),
        id: router.query.category,
      });
    } else {
      setCategory({
        label: "Latest",
        value: "latest",
      });
    }
  }, []);
  useEffect(async () => {
    let sortedArticles;
    let searchQ;
    let query;
    switch (category.value) {
      case "":
        if (searchValue) {
          searchQ = `*[_type == "article" && title match "${searchValue}"] | order(_createdAt desc)`;
          sortedArticles = await client.fetch(searchQ);
          setReqQuery(searchQ);
          setItems(sortedArticles);
          return;
        } else {
          query = `*[_type == "article"] | order(_createdAt desc)`;
          const newArticles = await client.fetch(query);
          setReqQuery(query);
          setItems(newArticles);
          return;
        }
      case "latest":
        query = `*[_type == "article"] | order(_createdAt desc)`;
        if (searchValue) {
          searchQ = `*[_type == "article" && title match "${searchValue}"] | order(_createdAt desc)`;
          sortedArticles = await client.fetch(searchQ);
          setReqQuery(searchQ);
          setItems(sortedArticles);
        } else {
          sortedArticles = await client.fetch(query);
          setReqQuery(query);
          setItems(sortedArticles);
        }
        break;
      case "oldest":
        query = `*[_type == "article"] | order(_createdAt asc)`;

        if (searchValue) {
          searchQ = `*[_type == "article" && title match "${searchValue}"] | order(_createdAt asc)`;
          sortedArticles = await client.fetch(searchQ);
          setReqQuery(searchQ);
          setItems(sortedArticles);
        } else {
          sortedArticles = await client.fetch(query);
          setReqQuery(query);
          setItems(sortedArticles);
        }
        break;
      default:
        if (category.id) {
          query = `*[_type == "article" && "${
            category.id.charAt(0).toUpperCase() + category.id.slice(1)
          }" in categories[]->title] | order(_createdAt desc)`;
          sortedArticles = await client.fetch(query);
          setReqQuery(query);
          setItems(sortedArticles);
          return;
        } else {
          if (searchValue) {
            searchQ = `*[_type == "article" && title match "${searchValue}"] | order(_createdAt asc)`;
            sortedArticles = await client.fetch(searchQ);
            setReqQuery(searchQ);
            setItems(sortedArticles);
          } else {
            query = `*[_type == "article"] | order(_createdAt desc)`;
            const newArticles = await client.fetch(query);
            setReqQuery(query);
            setItems(newArticles);
          }
        }
        break;
    }
  }, [category]);
  useEffect(async () => {
    if (router.query.search && router.query.search.length > 0) {
      const query = `*[_type == "article" && !(_id in path("drafts.**")) && title match "${router.query.search}"] | order(_createdAt desc)`;
      const updatedArticles = await client.fetch(query);
      if (category) {
        if (category.id) {
          const filtredByCategoryArticles = updatedArticles.filter(
            (el) =>
              el.categories &&
              el.categories.find((el) => el._ref === category.id)
          );
          setItems(filtredByCategoryArticles);
          return;
        }
      }
      setItems(updatedArticles);
    } else {
      let query;
      if (router.query.category) {
        if (
          router.query.category === "latest" ||
          router.query.category === "oldest"
        ) {
          query = `*[_type == "article"] | order(_createdAt ${
            router.query.category === "latest" ? "desc" : "asc"
          })`;
          const items = await client.fetch(query);
          setReqQuery(query);
          setItems(items);
        } else {
          if (category.id) {
            query = `*[_type == "article" && "${
              category.id.charAt(0).toUpperCase() + category.id.slice(1)
            }" in categories[]->title] | order(_createdAt desc)`;
            const items = await client.fetch(query);
            setReqQuery(query);
            setItems(items);
          }
        }
      } else {
        query = `*[_type == "article"] | order(_createdAt desc)`;
        const newArticles = await client.fetch(query);
        setReqQuery(query);
        setItems(newArticles);
      }
    }
  }, [router.query?.search]);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue?.length == 0 || typeof searchValue === "undefined") {
      const queryObj = { ...router.query };
      delete queryObj.search;
      router.push({
        query: queryObj,
      });
      return;
    }
    router.push({
      query: {
        ...router.query,
        search: searchValue.toLowerCase(),
      },
    });
  };
  const handleCategorySubmit = (e) => {
    setCategory(e);
    if (e.value.length == 0) {
      const queryObj = { ...router.query };
      delete queryObj.category;
      router.push({
        query: queryObj,
      });
      return;
    }
    router.push({
      query: {
        ...router.query,
        category: e.value.toLowerCase(),
      },
    });
  };
  return (
    <>
      <NextSeo
        title="Blog & News - Gifty"
        description="Our shop has blog, which contains userful information for you and gift trends"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/logoWhite.svg",
          },
        ]}
        openGraph={{
          type: "website",
          url: `${baseHost}/blog-news`,
          title: "Blog & News - Gifty",
          description:
            "Our shop has blog, which contains userful information for you and gift trends",
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
          site: `${baseHost}/blog-news`,
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

      <main className={styles.newsWrapper}>
        <Layout
          width="100%"
          height="100%"
          objectPosition="50% 70%"
          priority={true}
          animated={false}
          src={newsSolarBG}
          main
          alt="blogNews"
        >
          <h1 className={styles.mainTitle}>blog & news</h1>
        </Layout>
        <div className={styles.bar}>
          <form onSubmit={handleCategorySubmit} className={styles.select}>
            <div className={styles.selectChild}>
              <Inputs.SelectInput
                onChange={(e) =>
                  handleCategorySubmit(
                    e && e !== null
                      ? e
                      : {
                          value: "",
                          label: "",
                        }
                  )
                }
                value={{
                  value: category.value,
                  label: category.label,
                }}
                options={[
                  {
                    value: "oldest",
                    label: "Oldest",
                  },
                  {
                    value: "latest",
                    label: "Latest",
                  },
                  ...splittedCategories,
                ]}
              />
            </div>
          </form>
          <Title title={category.label + " " + "news"} />
          <form onSubmit={handleSearchSubmit} className={styles.search}>
            <div className={styles.searchChild}>
              <Inputs.SearchInput
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                title="Search..."
                submit={handleSearchSubmit}
              />
            </div>
          </form>
        </div>
        <div className={styles.barMobile}>
          <Title title={category.label + " " + "news"} />
          <form onSubmit={handleCategorySubmit} className={styles.select}>
            <div className={styles.selectChild}>
              <Inputs.SelectInput
                onChange={(e) =>
                  handleCategorySubmit(
                    e && e !== null
                      ? e
                      : {
                          value: "",
                          label: "",
                        }
                  )
                }
                value={{
                  value: category.value,
                  label: category.label,
                }}
                options={[
                  {
                    value: "oldest",
                    label: "Oldest",
                  },
                  {
                    value: "latest",
                    label: "Latest",
                  },
                  ...splittedCategories,
                ]}
              />
            </div>
          </form>
          <form onSubmit={handleSearchSubmit} className={styles.search}>
            <div className={styles.searchChild}>
              <Inputs.SearchInput
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                title="Search..."
                submit={handleSearchSubmit}
              />
            </div>
          </form>
        </div>
        <div className={styles.news}>
          <InfiniteScroll
            dataLength={items?.length}
            next={getMorePost}
            hasMore={hasMore}
          >
            {items &&
              items.map((article) => (
                <div
                  data-aos="fade-up"
                  key={article._id}
                  className={styles.newsItem}
                >
                  <div className={styles.newsInfo}>
                    <div className={styles.preview}>
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
                    <div className={styles.info}>
                      <Link href={`/blog-news/${article.slug.current}`}>
                        <h3 className={styles.infoTitle}>{article.title}</h3>
                      </Link>
                      <p className={styles.shortDescr}>
                        {article.shortDescription}
                      </p>
                      <div className={styles.infoBtn}>
                        <Buttons.Blue
                          to={`/blog-news/${article.slug.current}`}
                          text="more"
                        />
                      </div>
                      <div className={styles.dateWrapper}>
                        <div className={styles.clockIcon}>
                          <Image alt="date" src={clock} />
                        </div>
                        <p className={styles.date}>
                          {createReadableDate(article)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </InfiniteScroll>
        </div>
      </main>
    </>
  );
};
export const getServerSideProps = async () => {
  const query =
    '*[_type == "article" && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...10]';
  const categoryQuery = '*[_type == "category" && !(_id in path("drafts.**"))]';
  const articles = await client.fetch(query);
  const categories = await client.fetch(categoryQuery);
  const filtredCategories = categories.filter(
    (category) =>
      category.parents &&
      category.parents.find(
        (el) => el._ref === "f0070172-b07a-48ea-b0be-bf67ab245f61"
      )
  );

  return {
    props: { articles, categories: filtredCategories },
  };
};
export default BlogNews;
