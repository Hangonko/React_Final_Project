import { createContext, useContext, useReducer } from "react";

const cartContext = createContext();

export const useCartContext = () => useContext(cartContext);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;
      const productId = newItem?.id;
      const item = state.cart?.find((item) => item.product?._id === productId);
      let newCart;
      if (item) {
        newCart = state.cart.map((cartItem) => {
          if (cartItem.product?._id === productId) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
      } else {
        newCart = [...state.cart, { product: { ...newItem }, quantity: 1 }];
      }
      return { cart: newCart };
    case "REMOVE_FROM_CART":
      return state;
    case "POPULATE_CART":
      return state;
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { cart: [] });
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  return (
    <cartContext.Provider value={{ addToCart }}>
      {children}
    </cartContext.Provider>
  );
};
