import client from './client';

const endpoint = '/orders';
const orderPerUser = '?user=';

const getOrderPerUser = (userId) => client.apiClient.get(endpoint+orderPerUser+userId);

const deleteItemFromOrder = (token, orderId) => {
    client.apiClient.setHeader('Authorization', 'Bearer ' + token);
    return client.apiClient.delete(endpoint+"/"+orderId);
  }

  export default {
    getOrderPerUser,
    deleteItemFromOrder
}