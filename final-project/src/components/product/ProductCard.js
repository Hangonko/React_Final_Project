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
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import { isUserAdmin } from "../../app/util";
import { useProductContext } from "../../context/productContext";

const ProductCard = ({ product }) => {
  const [prodRating, setProdRating] = useState(product.averageRating);
  const { userData } = useUserContext();
  const { addToCart, removeCartItem, cart } = useCartContext();
  const { setSelectedProduct, setIsProductUpdating } = useProductContext();
  const isAdmin = isUserAdmin();

  const navigate = useNavigate();

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
    <Card className="Grid">
      <CardContent className="cardContent">
        <Link
          style={{ color: "black" }}
          className="cardContentLinks"
          to={`/products/categories/${product.category}/${product.name}`}
          state={{ id: product._id, category: product.category }}
        >
          <Typography variant="h5">{product.name}</Typography>
        </Link>
        <Typography variant="h6">${product.price}</Typography>
      </CardContent>
      <CardActions>
        <Rating
          style={{ color: "#8059BC" }}
          value={prodRating}
          onChange={onRatingChange}
          precision={0.5}
        />
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
        {isAdmin && (
          <Button
            onClick={() => {
              setIsProductUpdating(true);
              setSelectedProduct(product);
              navigate(`/products/${product._id}/edit`);
            }}
          >
            Edit
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
