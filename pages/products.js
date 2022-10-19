import { useState, useEffect } from "react";
import { Title, Inputs, Layout, Lists, Cards } from "../components";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";
import { client, urlFor } from "../lib/client";
import { connect } from "react-redux";
import operations from "../redux/auth/operations";
import selectors from "../redux/auth/selectors";
import cart from "../public/cart.svg";
import mainBg from "../public/mainLBG.jpg";
import secondMainBg from "../public/giftBg.jpg";
import thirdMainBg from "../public/giftBg1.jpg";
import forthMainBg from "../public/giftBg2.jpg";
import fifthMainBg from "../public/giftBg3.jpg";
import { useStateContext } from "../context/StateContext";
import styles from "../styles/Products.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Badge } from "@mui/material";
import { baseHost } from "../utils/seo";
import withNoSSR from "../hoc/withNoSSR";

const CartComponent = withNoSSR(({ cartItems }) => (
  <Badge badgeContent={cartItems?.length} color="secondary">
    <Image
      placeholder="blur"
      blurDataURL={cart}
      src={cart}
      alt="cart"
      width={100}
      height={100}
    />
  </Badge>
));
const Products = ({ products, categories, isAuthenticated, getMe }) => {
  const { onAdd, cartItems } = useStateContext();
  const [searchValue, setSearchValue] = useState("");
  const [productItems, setProductItems] = useState(products);
  const [category, setCategory] = useState({});
  const splittedCategories = categories.map((category) => ({
    value: category.title.charAt(0).toLowerCase() + category.title.slice(1),
    label: category.title,
    id: category._id,
  }));
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      getMe();
    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (isAuthenticated) {
      getMe();
    }
    setSearchValue(router.query?.search);
    if (router.query?.category) {
      setCategory({
        value: router.query.category,
        label:
          router.query.category.charAt(0).toUpperCase() +
          router.query.category.slice(1),
      });
    } else {
      setCategory({
        label: "Latest",
        value: "latest",
      });
    }
  }, []);
  useEffect(() => {
    let sortedProducts;
    switch (category.value) {
      case "":
        if (searchValue) {
          sortedProducts = products.filter((el) =>
            el.title.toLowerCase().includes(router.query.search.toLowerCase())
          );
          setProductItems(sortedProducts);
          return;
        }
        sortedProducts = products;
        setProductItems(sortedProducts);
      case "latest":
        sortedProducts = productItems.sort(
          (a, b) =>
            Date.parse(new Date(b._createdAt)) -
            Date.parse(new Date(a._createdAt))
        );
        setProductItems(sortedProducts);
        break;
      case "relevant":
        sortedProducts = productItems.sort(
          (a, b) =>
            Date.parse(new Date(a._createdAt)) -
            Date.parse(new Date(b._createdAt))
        );
        setProductItems(sortedProducts);
        break;
      default:
        sortedProducts = productItems.filter(
          (el) =>
            el.categories && el.categories.find((el) => el._ref === category.id)
        );
        setProductItems(sortedProducts);
        break;
    }
  }, [category]);
  useEffect(() => {
    if (router.query.search && router.query.search.length > 0) {
      const updatedProducts = products.filter((el) =>
        el.title.toLowerCase().includes(router.query.search.toLowerCase())
      );
      if (category) {
        if (category.id) {
          const filtredByCategoryArticles = updatedProducts.filter(
            (el) =>
              el.categories &&
              el.categories.find((el) => el._ref === category.id)
          );
          setProductItems(filtredByCategoryArticles);
          return;
        }
      }
      setProductItems(updatedProducts);
    } else {
      setProductItems(products);
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
      setProductItems(products);
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
      setProductItems(products);
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
        title="Products - Gifty"
        description="We have gifts that will make your person happier!"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/logoWhite.svg",
          },
        ]}
        openGraph={{
          type: "website",
          url: `${baseHost}/products`,
          title: "Products - Gifty",
          description: "We have gifts that will make your person happier!",
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
          site: `${baseHost}/products`,
          cardType: "summary_large_image",
        }}
        robotsProps={{
          nosnippet: true,
          notranslate: true,
          noimageindex: false,
          noarchive: true,
          maxSnippet: -1,
          maxImagePreview: "none",
          maxVideoPreview: -1,
        }}
      />
      <LocalBusinessJsonLd
        type="Store"
        id={`${baseHost}/products`}
        name="Gifty"
        description="We have gifts that will make your person happier!"
        url={`${baseHost}/products`}
      />
      <main>
        <div className={styles.wrapper}>
          <Layout
            width="100%"
            height="100%"
            objectPosition="50% 70%"
            priority={true}
            animated={true}
            srcs={[mainBg, thirdMainBg, secondMainBg, fifthMainBg, forthMainBg]}
            small
            main
            alt="giftyProducts"
          >
            <h1 className={styles.mainTitle}>our solar products</h1>
          </Layout>
          <div className={styles.mainInfoBox}>
            <div className={styles.mainInfo}>
              <div className={styles.cartIcon}>
                <Link href="/cart">
                  <div className={styles.cartIconChild}>
                    <CartComponent cartItems={cartItems} />
                  </div>
                </Link>
              </div>
              <form className={styles.input}>
                <div className={styles.inputChild}>
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
                        value: "relevant",
                        label: "Relevant",
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
              <form onSubmit={handleSearchSubmit} className={styles.input}>
                <div className={styles.inputChild}>
                  <Inputs.SearchInput
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    title="Search..."
                    submit={handleSearchSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <Title title="all products" />
        <Lists.ShopCardsList>
          {productItems?.map((product) => (
            <Cards.ShopCard
              key={product._id}
              title={product.title}
              descr={product.shortDescription}
              price={product.price}
              quantity={product.quantity}
              src={product?.image && urlFor(product.image[0]).url()}
              to={`/products/${product.slug?.current}`}
              onAdd={() => onAdd(product, 1)}
            />
          ))}
        </Lists.ShopCardsList>
        {productItems.length <= 0 && (
          <p className={styles.info}>
            There are no products by your query now...
          </p>
        )}
      </main>
    </>
  );
};
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const categoryQuery = '*[_type == "category"]';
  const products = await client.fetch(query);
  const categories = await client.fetch(categoryQuery);
  const filtredCategories = categories.filter(
    (category) =>
      category.parents &&
      category.parents.find(
        (el) => el._ref === "996a5ed2-3aff-43cd-97a0-d4c30e3b80e8"
      )
  );
  return {
    props: { products, categories: filtredCategories },
  };
};
const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
});
export default connect(mapStateToProps, {
  getMe: operations.getMe,
})(Products);
