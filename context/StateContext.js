import React, { createContext, useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import operations from "../redux/auth/operations";
import selectors from "../redux/auth/selectors";
import { toast } from "react-toastify";

const Context = createContext();

const StateContext = ({ children, isAuthenticated, updateUserCart, user }) => {
  const [cartItems, setCartItems] = useState(isAuthenticated ? user.cart : []);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!isAuthenticated && JSON.parse(localStorage.getItem("cartItems"))) {
      setCartItems(JSON.parse(localStorage.getItem("cartItems")));
    }
  }, []);
  useEffect(() => {
    const total = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
    setTotalPrice(total);
    if (isAuthenticated) {
      updateUserCart(user._id, { cart: cartItems });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return;
    } else {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);
  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    const checkQuantity = cartItems.filter((el) => el._id === product._id);

    if (
      (checkQuantity.length > 0 &&
        checkQuantity[0].quantity + 1 > product.quantity) ||
      quantity > product.quantity
    ) {
      toast.error(`Product ${product.title} does not have a larger quantity`);
      return;
    }

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id) {
          const newQty = item.quantity + quantity;
          return {
            ...item,
            quantity: newQty,
          };
        } else {
          return {
            ...item,
          };
        }
      });
      setCartItems(updatedCartItems);
      toast.success(
        `Product ${product.title} is already in cart. Quantity increased by 1`
      );
    } else {
      product.purchaseDate = "";
      setCartItems([...cartItems, { ...product, quantity: quantity }]);

      toast.success(`Product ${product.title} added to cart`);
    }
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuanitity = (id, value, productItem) => {
    if (value === "inc") {
      const newCartItems = cartItems.map((product) => {
        if (product._id === id) {
          if (product.quantity + 1 > productItem.quantity) {
            toast.error(
              `Product ${productItem.title} does not have a larger quantity`
            );
            return product;
          }

          setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
          product.quantity = product.quantity + 1;
        }
        return product;
      });

      setCartItems(newCartItems);
    } else if (value === "dec") {
      const newCartItems = cartItems.map((product) => {
        if (product._id === id && product.quantity > 1) {
          setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
          product.quantity -= 1;
        }
        return product;
      });

      setCartItems(newCartItems);
    }
  };

  const incQty = (product) => {
    setQty((prevQty) => {
      if (prevQty === product.quantity) return prevQty;

      return prevQty + 1;
    });
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };
  const refreshCart = () => {
    setCartItems([]);
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        refreshCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
  user: selectors.getUser(state),
});
export default connect(mapStateToProps, {
  updateUserCart: operations.updateUserCart,
})(StateContext);
export const useStateContext = () => useContext(Context);
