import React, { useEffect, useState } from "react";
import { FormControl, TextField, Button } from "@mui/material";
import useForm from "../../app/useForm";
import FileBase from "react-file-base64";
import { useProductContext } from "../../context/productContext";

const genAddProdFormValues = (selectedProduct) => {
  return {
    name: {
      value: selectedProduct?.name || "",
      required: true,
      error: "",
      inputValidation: (name) =>
        name.length > 1 ? null : "Name should have at least 2 charachters",
    },
    description: {
      value: selectedProduct?.description || "",
      required: true,
      error: "",
      inputValidation: (description) =>
        description.length > 1
          ? null
          : "Description should have at least 2 charachters",
    },
    category: {
      value: selectedProduct?.category || "",
      required: true,
      error: "",
      inputValidation: (category) =>
        category.length > 1
          ? null
          : "Category should have at least 2 charachters",
    },
    brand: {
      value: selectedProduct?.brand || "",
      required: true,
      error: "",
      inputValidation: (brand) =>
        brand.length > 1 ? null : "Brand should have at least 2 charachters",
    },
    price: {
      value: selectedProduct?.price || "",
      required: true,
      error: "",
      inputValidation: (price) =>
        price > 0 ? null : "Price should be positive number",
    },
  };
};

const ProductForm = () => {
  const {
    formValues: productFormValues,
    setFormValues: setProductFormValues,
    inputChangeHandler,
    checkButtonDisable,
    clearForm,
  } = useForm({
    defaultFormValues: genAddProdFormValues(),
  });

  const { saveProduct, selectedProduct } = useProductContext();

  const [image, setImage] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    setIsButtonDisabled(checkButtonDisable(productFormValues));
  }, [productFormValues]);

  useEffect(() => {
    setProductFormValues(genAddProdFormValues(selectedProduct));
  }, [selectedProduct]);

  const saveProductHandler = () => {
    const name = productFormValues.name.value;
    const description = productFormValues.description.value;
    const category = productFormValues.category.value;
    const brand = productFormValues.brand.value;
    const price = productFormValues.price.value;
    saveProduct({
      name,
      description,
      category,
      brand,
      price,
      image: image || "",
    });
  };
  return (
    <FormControl fullWidth>
      <TextField
        name="name"
        value={productFormValues.name.value}
        onChange={inputChangeHandler}
        error={!!productFormValues.name.error}
        helperText={productFormValues.name.error}
        label={"name"}
        margin="dense"
      />
      <TextField
        name="description"
        value={productFormValues.description.value}
        onChange={inputChangeHandler}
        error={!!productFormValues.description.error}
        helperText={productFormValues.description.error}
        label={"description"}
        margin="dense"
      />
      <TextField
        name="category"
        value={productFormValues.category.value}
        onChange={inputChangeHandler}
        error={!!productFormValues.category.error}
        helperText={productFormValues.category.error}
        label={"category"}
        margin="dense"
      />
      <TextField
        name="brand"
        value={productFormValues.brand.value}
        onChange={inputChangeHandler}
        error={!!productFormValues.brand.error}
        helperText={productFormValues.brand.error}
        label={"brand"}
        margin="dense"
      />
      <TextField
        name="price"
        value={productFormValues.price.value}
        onChange={inputChangeHandler}
        error={!!productFormValues.price.error}
        helperText={productFormValues.price.error}
        label={"price"}
        margin="dense"
      />
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => setImage(base64)}
      />
      <Button disabled={isButtonDisabled} onClick={saveProductHandler}>
        Save
      </Button>
    </FormControl>
  );
};

export default ProductForm;
