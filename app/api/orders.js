import client from './client';

const endpoint = '/orders';
const orderPerUser = '?user=';


const getOrderPerUser = (userId) => client.apiClient.get(endpoint+orderPerUser+userId);

const getSubmittedOrder = (userId) => client.apiClient.get(endpoint+orderPerUser+userId+'&orderStatus=submitted&sort=createdAt');

const getDeliveredOrder = (userId) => client.apiClient.get(endpoint+orderPerUser+userId+'&orderStatus=delivered');

const deleteItemFromOrder = (token, orderId) => {
    client.apiClient.setHeader('Authorization', 'Bearer ' + token);
    return client.apiClient.delete(endpoint+"/"+orderId);
  }

  export default {
    getOrderPerUser,
    getSubmittedOrder,
    getDeliveredOrder,
    deleteItemFromOrder
}