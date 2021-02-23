import client from './client';

const endpoint = '/items';
const typePasta = '?type=pasta';
const typeSauce = '?type=sauce';
const typeTopping = '?type=topping';
const typeCombo = '?type=combo';
const typeSalad= '?type=salad';
const typeDessert= '?type=dessert';
const typeDrink= '?type=drink';

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

export default {
    getPastas,
    getSauces,
    getToppings,
    getCombos,
    getSalads,
    getDesserts,
    getDrinks,
    getPhoto
}