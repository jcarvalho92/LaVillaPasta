import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import Picker from "../components/forms/FormPicker";
import SubmitButton from "../components/forms/SubmitButton";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import itemsApi from "../api/items";
import UploadScreen from "./UploadScreen";
import { useContext } from "react";
import AuthContext from "../auth/context";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  image: Yup.array().required().nullable().label("Please select an image"),
});

const categories = [
  {
    backgroundColor: "#fd9644",
    icon: "pasta",
    label: "Pasta",
    value: 1,
  },
  {
    backgroundColor: "#fc5c65",
    icon: "bowl-mix",
    label: "Sauce",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "cheese",
    label: "Topping",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "food-fork-drink",
    label: "Combo",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "cupcake",
    label: "Dessert",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "glass-cocktail",
    label: "Drink",
    value: 6,
  },
  
];

function AddItemScreen() {
  const authContext = useContext(AuthContext);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setImageData] = useState({});
  const handleSubmit = async (item, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);

    const result = await itemsApi.addItem(
      authContext.token,
      { ...item},
      (progress) => setProgress(progress)
    );
    
    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the item");
    }
    postImage(result.data.data._id);
    resetForm();
  };
  
  const addImage = (data) => {
    setImageData(data);
  }

  const postImage = async (itemId) => {
    const result = await itemsApi.changeItemPicture(
      authContext.token,
      itemId,
      file
    );
    if (!result.ok) {
      return alert("Fail to add the image");
    }

  }
  
  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          image: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="image" addImage={addImage} />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default AddItemScreen;
