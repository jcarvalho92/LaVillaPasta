import React from "react";
import { useFormikContext } from "formik";
import mime from "mime";

import ErrorMessage from "./ErrorMessage";
import ImageInputList from "../ImageInputList";

function FormImagePicker({ name , addImage}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
    addItemImage(uri);
    
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  const addItemImage = (uri) => {

    const newImageUri =  "file:///" + uri.split("file:/").join("");

    const formData = new FormData();
    formData.append('photo', {
      uri : newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop()
    });
    addImage(formData);
  }

  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
