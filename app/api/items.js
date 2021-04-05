import client from './client';

const endpoint = '/items';
const typePasta = '?type=pasta';
const typeSauce = '?type=sauce';
const typeTopping = '?type=topping';
const typeCombo = '?type=combo';
const typeSalad= '?type=salad';
const typeDessert= '?type=dessert';
const typeDrink= '?type=drink';
const orders = '/orders'

const getPastas = () => client.apiClient.get(endpoint+typePasta);
const getSauces = () => client.apiClient.get(endpoint+typeSauce);
const getToppings = () => client.apiClient.get(endpoint+typeTopping);
const getCombos = () => client.apiClient.get(endpoint+typeCombo);
const getSalads = () => client.apiClient.get(endpoint+typeSalad);
const getDesserts = () => client.apiClient.get(endpoint+typeDessert);
const getDrinks = () => client.apiClient.get(endpoint+typeDrink);

const getPhoto = (image) => {
    return client.url+"/uploads/"+image
}

const postItemToCart = (token, itemId, quantity) => {
    client.apiClient.setHeader('Authorization','Bearer '+token)
    result = client.apiClient.post(endpoint+"/"+itemId+orders, {quantity});
    return result;
}

const changeQtdItemOrder = (token, itemId,orderId, quantity) => {
    client.apiClient.setHeader('Authorization','Bearer '+token)
    result = client.apiClient.put(endpoint+"/"+itemId+orders+"/"+orderId, {quantity});
    return result;
}

const changeStatusItemOrder = (token, itemId,orderId, status) => {
    console.log("inside endpoint: ");
    console.log("token: " + token);
    console.log("itemId: " + itemId);
    console.log("orderId: "+orderId);
    console.log("status: " +status);
    client.apiClient.setHeader('Authorization','Bearer '+token)
    result = client.apiClient.put(endpoint+"/"+itemId+orders+"/"+orderId, {status});
    return result;
}

const changeItemPicture = (token, itemId,file) => {
    client.apiClient.setHeader('Authorization','Bearer '+token)
    client.apiClient.setHeader('content-type','multipart/form-data')
    result = client.apiClient.put(endpoint+"/"+itemId+"/photo", file);
    return result;
}

const addItem = (token, item, onUploadProgress) => {
    client.apiClient.setHeader('Authorization','Bearer '+token)

    const data = new FormData();

    data.append("title", item.title);
    data.append("unitPrice", item.price);
    data.append("type", item.category.label.toLowerCase());
    data.append("description", item.description);
    result = client.apiClient.post(endpoint, data, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
    
    return result;
  };

export default {
    getPastas,
    getSauces,
    getToppings,
    getCombos,
    getSalads,
    getDesserts,
    getDrinks,
    getPhoto,
    postItemToCart,
    changeQtdItemOrder,
    changeStatusItemOrder,
    addItem,
    changeItemPicture
}