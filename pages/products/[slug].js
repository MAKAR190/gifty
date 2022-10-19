import { useState, useEffect } from "react";
import {
  Title,
  Buttons,
  Slider,
  Cards,
  Tabel,
  EmailUs,
  Layout,
  Modal,
} from "../../components";
import { NextSeo, ProductJsonLd } from "next-seo";
import getStripe from "../../lib/getStripe";
import { client, urlFor } from "../../lib/client";
import { Fab } from "@mui/material";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import styles from "../../styles/ProductPage.module.css";
import Image from "next/image";
import contactUs from "../../public/contactUs.jpg";
import minus from "../../public/minus.svg";
import plus from "../../public/plus.svg";
import { useStateContext } from "../../context/StateContext";
import { PortableText } from "@portabletext/react";
import { useRouter } from "next/router";
import { baseHost } from "../../utils/seo";

const ProductPage = ({ products, product }) => {
  const [showModal, setShowModal] = useState(false);
  const { onAdd } = useStateContext();
  const [showBack, setShowBack] = useState(false);
  const [qty, setQty] = useState(1);
  const router = useRouter();
  const related = products
    ?.filter(
      (el) =>
        el.title.includes(product?.title.substr(0, 4)) &&
        el.title !== product?.title
    )
    .slice(0, 6);
  const filtredProducts = products.filter(
    (productItem) => productItem.title !== product?.title
  );
  const finallyRelated = [...new Set(related.concat(filtredProducts))];

  useEffect(() => {
    const checkoutCode = JSON.parse(localStorage.getItem("checkoutCode"));
    if (checkoutCode) {
      localStorage.removeItem("checkoutCode");
    }
  }, []);

  useEffect(() => {
    setQty(1);
  }, [router.asPath]);

  const incQty = () => {
    setQty((prevQty) => {
      if (prevQty === product.quantity) {
        return prevQty;
      }

      return prevQty + 1;
    });
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ ...product, quantity: qty }]),
    });
    if (response.statusCode === 500) return;
    const data = await response.json();
    stripe.redirectToCheckout({ sessionId: data.id });
    if (response.status === 200) {
      localStorage.setItem(
        "checkoutCode",
        JSON.stringify({
          status: 200,
          type: "once",
          quantity: qty,
          product: product,
        })
      );
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined" && +window?.history?.state?.idx > 0) {
      setShowBack(true);
    } else {
      setShowBack(false);
    }
  }, []);

  return (
    <>
      {product && (
        <>
          <NextSeo
            title={product.title}
            description={product.shortDescription}
            additionalLinkTags={[
              {
                rel: "icon",
                href: urlFor(product?.image && product.image[0]).url(),
              },
            ]}
            openGraph={{
              type: "website",
              url: `${baseHost}/products/${product.slug.current}`,
              title: product.title,
              description: product.shortDescription,
              images: [
                {
                  url: urlFor(product?.image && product.image[0]).url(),
                  width: 800,
                  height: 600,
                  alt: product.title,
                },
              ],
            }}
            twitter={{
              handle: "@handle",
              site: `${baseHost}/products/${product.slug.current}`,
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
          <ProductJsonLd
            productName={product.title}
            images={product.image.map((image, i) =>
              urlFor(product?.image && product.image[i]).url()
            )}
            description={product.shortDescription}
            color={product.color}
            material={product.material}
          />
        </>
      )}
   
      <main>
        <div className={styles.wrapper}>
          {showBack && (
            <div className={styles.backBtn}>
              <Buttons.Black onClick={() => router.back()} caps text="back" />
            </div>
          )}
          <div
            style={!showBack ? { marginTop: 1 + "%" } : {}}
            className={styles.productBox}
          >
            <div
              className={styles.alignProductBox}
              style={product?.image.length <= 2 ? { alignItems: "center" } : {}}
            >
              <div className={styles.previewsBox}>
                <div className={styles.mainPreview}>
                  {product?.image.length > 1 ? (
                    <Image
                      objectFit="contain"
                      width={300 + "%"}
                      height={300 + "%"}
                      src={urlFor(product?.image && product.image[0]).url()}
                      onClick={() => setShowModal(true)}
                      placeholder="blur"
                      blurDataURL={urlFor(
                        product?.image && product.image[0]
                      ).url()}
                      alt={product.title}
                    />
                  ) : (
                    <Zoom>
                      <Image
                        objectFit="contain"
                        width={300 + "%"}
                        height={300 + "%"}
                        src={urlFor(product?.image && product.image[0]).url()}
                        onClick={() => setShowModal(true)}
                        placeholder="blur"
                        blurDataURL={urlFor(
                          product?.image && product.image[0]
                        ).url()}
                        alt={product.title}
                      />
                    </Zoom>
                  )}
                </div>
                {product?.image.length > 2 && (
                  <div className={styles.previewsSlider}>
                    <Slider.ImageSlider>
                      {product.image.map((img, i) => (
                        <Cards.ImageCard
                          key={i}
                          src={urlFor(product.image && product.image[i]).url()}
                          alt={product.title}
                        />
                      ))}
                    </Slider.ImageSlider>
                  </div>
                )}
              </div>
              <div className={styles.infoBox}>
                <h1 className={styles.infoTitle}>{product?.title}</h1>
                <Tabel data={product} />
                <div className={styles.infoDescr}>
                  <PortableText value={product.description} />
                </div>

                {product.quantity > 0 ? (
                  <div className={styles.actions}>
                    <div className={styles.actionBtns}>
                      <div className={styles.actionBtn}>
                        <Fab onClick={decQty} size="small" color="primary">
                          <Image
                            style={{
                              cursor: "pointer",
                            }}
                            src={minus}
                            alt="decrement"
                          />
                        </Fab>
                      </div>

                      <div className={styles.actionBtn}>
                        <b>{qty}</b>
                      </div>
                      <Fab onClick={incQty} size="small" color="primary">
                        <div className={styles.actionBtn}>
                          <Image
                            style={{
                              marginTop: "1px",
                              cursor: "pointer",
                            }}
                            src={plus}
                            alt="increment"
                          />
                        </div>
                      </Fab>
                      <div className={styles.payBtn}>
                        <Buttons.Blue onClick={handleCheckout} text="buy now" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className={styles.erroInfoMessage}>
                    This product is not in stock for now
                  </p>
                )}
                <div className={styles.buttons}>
                  <div id={styles.firstBtn} className={styles.btn}>
                    <Buttons.Blue
                      disabled={product.quantity <= 0}
                      onClick={() => onAdd(product, qty)}
                      text="add to cart"
                    />
                  </div>
                  <div className={styles.btn}>
                    <Buttons.Black
                      to={router.asPath + "#emailForm"}
                      caps
                      text="leave a message for details"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Title title="related products" />
        <div className={styles.slider}>
          {related.length < 3 ? (
            <Slider.LandingSlider items={related.length}>
              {finallyRelated.slice(0, 4).map((product) => (
                <div key={product._id} className={styles.productItem}>
                  <Cards.LandingCard
                    key={product._id}
                    title={product.title}
                    descr={product.shortDescription}
                    src={product?.image && urlFor(product.image[0]).url()}
                    to={`/products/${product.slug?.current}`}
                    onAdd={() => onAdd(product, 1)}
                  />
                </div>
              ))}
            </Slider.LandingSlider>
          ) : (
            <Slider.LandingSlider items={related.length}>
              {related.map((product) => (
                <div key={product._id} className={styles.productItem}>
                  <Cards.LandingCard
                    key={product._id}
                    title={product.title}
                    descr={product.shortDescription}
                    src={product?.image && urlFor(product.image[0]).url()}
                    to={`/products/${product.slug?.current}`}
                    onAdd={() => onAdd(product, 1)}
                  />
                </div>
              ))}
            </Slider.LandingSlider>
          )}
        </div>
        <div id="emailForm">
          <Layout
            width="100%"
            height="100%"
            objectPosition="50% 70%"
            priority={false}
            animated={false}
            src={contactUs}
          >
            <div className={styles.emailForm}>
              <EmailUs title="email us for details" />
            </div>
          </Layout>
        </div>
      </main>
    
      {showModal && product?.image.length > 1 && (
        <Modal.Modal onClose={() => setShowModal(false)}>
          <div className={styles.modalSlider}>
            <Slider.ImageSlider modal>
              {product.image.map((img, i) => (
                <div key={i} style={{ margin: "0 auto" }}>
                  <Zoom>
                    <Image
                      src={urlFor(product.image && product.image[i]).url()}
                      width={450}
                      height={450}
                      objectFit="contain"
                      alt={product.title}
                      placeholder="blur"
                      blurDataURL={urlFor(
                        product.image && product.image[i]
                      ).url()}
                    />
                  </Zoom>
                </div>
              ))}
            </Slider.ImageSlider>
          </div>
        </Modal.Modal>
      )}
    </>
  );
};
export const getServerSideProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};
export default ProductPage;
