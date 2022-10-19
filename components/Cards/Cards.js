import { useState, useEffect } from "react";
import styles from "./Cards.module.css";
import Image from "next/image";
import Buttons from "../Buttons/Buttons";
import { urlFor } from "../../lib/client";
import addToCart from "../../public/addToCart.svg";
import notInStock from "../../public/notInStock.svg";
import removeFromCart from "../../public/removeFromCart.svg";
import minus from "../../public/minus.svg";
import plus from "../../public/plus.svg";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Lists from "../Lists/Lists";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Fab,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TableFooter,
  TablePagination,
} from "@mui/material";
import Link from "next/link";

const LandingCard = ({ title, descr, src, to }) => {
  const [hoverBox, setHoverBox] = useState(false);
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setHoverBox(true);
    }
  }, []);
  return (
    <div className={styles.card}>
      <div className={styles.lcimgWrapper}>
        <div className={styles.lcimg}>
          <Link href={to || "/"}>
            <a>
              <Image
                width={250 + "%"}
                height={250 + "%"}
                placeholder="blur"
                blurDataURL={src}
                src={src}
                alt={title}
              />
            </a>
          </Link>
        </div>
        {hoverBox && (
          <div className={styles.hoverBox}>
            <div className={styles.hoverBoxBtn}>
              <Buttons.Blue text="view more" to={to || "/"} />
            </div>
          </div>
        )}
      </div>
      <div className={styles.lctext}>
        <Link href={to || "/"}>
          <h3 className={styles.lctitle}>{title}</h3>
        </Link>
        <p className={styles.lcdescr}>{descr}</p>
      </div>
    </div>
  );
};
const ShopCard = ({ title, descr, src, price, to, quantity, onAdd }) => {
  return (
    <div className={styles.card}>
      <Link href={to}>
        <div className={styles.scimgWrapper}>
          <a>
            {src && (
              <Image
                style={{
                  cursor: "pointer",
                }}
                placeholder="blur"
                blurDataURL={src}
                className={styles.lcimg}
                src={src}
                width={200 + "%"}
                height={200 + "%"}
                alt={title}
              />
            )}
          </a>
        </div>
      </Link>
      <div className={styles.scTextWrapper}>
        <Link href={to}>
          <div className={styles.sctext}>
            <h3 className={styles.sctitle}>{title}</h3>
            <p className={styles.scdescr}>{descr}</p>
          </div>
        </Link>
        <p className={styles.price}>{price}$</p>
      </div>
      <div id={styles.shopCardActions} className={styles.sactions}>
        <div id={styles.shopCardActionsBtn} className={styles.sactionsBtn}>
          <Buttons.Blue to={to} text="more" />
        </div>
        <Image
          style={{
            cursor: "pointer",
          }}
          width={45}
          height={45}
          placeholder="blur"
          blurDataURL={quantity > 0 ? addToCart : notInStock}
          src={quantity > 0 ? addToCart : notInStock}
          onClick={onAdd}
          alt="addToCart"
        />
      </div>
    </div>
  );
};
const CartTable = ({ cartItems, decQuantity, incQuantity, remove }) => {
  return (
    <>
      <div style={{ width: "100%" }} id={styles.cartTable}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 320 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="center">Preview</TableCell>
                <TableCell align="center">Price ($)</TableCell>
                <TableCell align="center">Decrease (q)</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Increase (q)</TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link href={`/products/${item.slug.current}`}>
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <Link href={`/products/${item.slug.current}`}>
                      <a>
                        <Image
                          width={60}
                          height={60}
                          placeholder="blur"
                          blurDataURL={urlFor(
                            item.image && item.image[0]
                          ).url()}
                          src={urlFor(item.image && item.image[0]).url()}
                          alt={item.title}
                        />
                      </a>
                    </Link>
                  </TableCell>
                  <TableCell align="center">{item.price}</TableCell>
                  <TableCell align="center">
                    <Fab
                      size="small"
                      color="primary"
                      onClick={() => decQuantity(item)}
                    >
                      <Image src={minus} alt="decrement" />
                    </Fab>
                  </TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">
                    <Fab
                      size="small"
                      color="primary"
                      onClick={() => incQuantity(item)}
                    >
                      <Image src={plus} alt="increment" />
                    </Fab>
                  </TableCell>
                  <TableCell align="center">
                    <Image
                      style={{ cursor: "pointer" }}
                      width={30}
                      height={30}
                      src={removeFromCart}
                      onClick={() => remove(item)}
                      alt="remove"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Lists.CartCardsList>
        {cartItems.map((item) => (
          <div key={item._id} id={styles.cartCard} className={styles.card}>
            <div id={styles.cartCardImgWrapper} className={styles.scimgWrapper}>
              <Link href={`/products/${item.slug.current}`}>
                <a>
                  <Image
                    style={{
                      cursor: "pointer",
                    }}
                    className={styles.lcimg}
                    src={urlFor(item.image && item.image[0]).url()}
                    placeholder="blur"
                    blurDataURL={urlFor(item.image && item.image[0]).url()}
                    width={240 + "%"}
                    height={240 + "%"}
                    alt={item.title}
                  />
                </a>
              </Link>
            </div>
            <div className={styles.scTextWrapper}>
              <div className={styles.sctext}>
                <h3 className={styles.lctitle}>
                  <Link href={`/products/${item.slug.current}`}>
                    {item.title}
                  </Link>
                </h3>
                <p className={styles.lcdescr}>{item.shortDescription}</p>
              </div>
              <p className={styles.price}>{item.price}$</p>
            </div>
            <div className={styles.sactions}>
              <div className={styles.sactionBtns}>
                <div className={styles.sactionBtn}>
                  <Image
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => decQuantity(item)}
                    src={minus}
                    alt="decrement"
                  />
                </div>
                <div className={styles.sactionBtn}>
                  <b>{item.quantity}</b>
                </div>
                <div className={styles.sactionBtn}>
                  <Image
                    style={{
                      marginTop: "1px",
                      cursor: "pointer",
                    }}
                    onClick={() => incQuantity(item)}
                    src={plus}
                    alt="increment"
                  />
                </div>
              </div>
              <Image
                style={{
                  cursor: "pointer",
                }}
                src={removeFromCart}
                onClick={() => remove(item)}
                alt="remove"
              />
            </div>
          </div>
        ))}
      </Lists.CartCardsList>
    </>
  );
};
const History = ({ history }) => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(history);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const matches = useMediaQuery("(min-width:400px)");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={styles.history}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 320 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              {matches && <TableCell align="center">Preview</TableCell>}
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rows.length > 5
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((item, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link href={`/products/${item.slug.current}`}>
                    {item.title}
                  </Link>
                </TableCell>
                {matches && (
                  <TableCell align="center">
                    <Link href={`/products/${item.slug.current}`}>
                      <a>
                        <Image
                          width={60}
                          height={60}
                          placeholder="blur"
                          blurDataURL={urlFor(
                            item.image && item.image[0]
                          ).url()}
                          src={urlFor(item.image && item.image[0]).url()}
                          alt={item.title}
                        />
                      </a>
                    </Link>
                  </TableCell>
                )}

                <TableCell align="center">{item.price}$</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">{item.purchaseDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {history.length > 5 && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};
const ImageCard = ({ src, modal, alt }) => {
  return (
    <div
      id={styles.imageCard}
      className={styles.card}
      style={{ maxWidth: modal ? "10000px" : "420px" }}
    >
      <div id={styles.imageCardPreview} className={styles.lcimgWrapper}>
        <Zoom>
          <Image
            style={{
              cursor: "pointer",
              maxWidth: modal ? "1000px" : "300px",
            }}
            className={styles.lcimg}
            src={src}
            placeholder="blur"
            blurDataURL={src}
            width={modal ? 400 + "%" : 140 + "%"}
            height={modal ? 340 + "%" : 140 + "%"}
            alt={alt}
          />
        </Zoom>
      </div>
    </div>
  );
};

module.exports = {
  LandingCard: LandingCard,
  ShopCard: ShopCard,
  ImageCard: ImageCard,
  CartTable: CartTable,
  History: History,
};
