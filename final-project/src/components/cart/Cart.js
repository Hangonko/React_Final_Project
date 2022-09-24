import React from "react";
import { getUser } from "../../app/util";
import { useCartContext } from "../../context/cartContext";
import { Button } from "@mui/material";

const Cart = () => {
  const { cart, saveCart } = useCartContext();
  const user = getUser();
  return (
    <div>
      {cart?.length > 0
        ? cart.map((cartItem) => {
            return (
              <div key={cartItem.product._id}>
                <h1>{cartItem.product.name}</h1>
                <p>{cartItem.quantity}</p>
              </div>
            );
          })
        : "no items in cart"}
      {user && (
        <Button
          onClick={() => {
            saveCart(user._id);
          }}
          disabled={!cart.length}
        >
          Save cart
        </Button>
      )}
    </div>
  );
};

export default Cart;
