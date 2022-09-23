import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Rating,
} from "@mui/material";
import { instance } from "../../app/instance";
import { useUserContext } from "../../context/userContext";

const ProductCard = ({ product }) => {
  const [prodRating, setProdRating] = useState(product.averageRating);
  const { userData } = useUserContext();

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
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="h6">${product.price}</Typography>
      </CardContent>
      <CardActions>
        <Rating value={prodRating} onChange={onRatingChange} precision={0.5} />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
