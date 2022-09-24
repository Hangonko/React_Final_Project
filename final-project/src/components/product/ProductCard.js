import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Rating,
  Button,
} from "@mui/material";
import { instance } from "../../app/instance";
import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";

const ProductCard = ({ product }) => {
  const [prodRating, setProdRating] = useState(product.averageRating);
  const { userData } = useUserContext();
  const { addToCart, removeCartItem, cart } = useCartContext();

  const isProductInCart = cart?.find(
    (cartItem) => cartItem.product?._id === product._id
  );

  const onRatingChange = async (e) => {
    setProdRating(+e.target.value);
    try {
      await instance.post(
        `/products/${product._id}/users/${userData._id}/rate`,
        {
          rating: +e.target.value,
        }
      );
    } catch {}
  };
  return (
    <Card>
      <CardContent>
        <Link
          to={`/products/categories/${product.category}/${product.name}`}
          state={{ id: product._id, category: product.category }}
        >
          <Typography variant="h5">{product.name}</Typography>
        </Link>
        <Typography variant="h6">${product.price}</Typography>
      </CardContent>
      <CardActions>
        <Rating value={prodRating} onChange={onRatingChange} precision={0.5} />
        {isProductInCart ? (
          <>
            <Button onClick={() => removeCartItem(product._id)}>-</Button>
            {isProductInCart.quantity}
            <Button
              onClick={(e) => {
                addToCart(product);
              }}
            >
              +
            </Button>
          </>
        ) : (
          <Button onClick={() => addToCart(product)}>Add to cart</Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
