import client from './client';

const endpoint = '/orders';
const orderPerUser = '?user=';
const billings = '/billings';

const getOrderPerUser = (userId) => client.apiClient.get(endpoint+orderPerUser+userId);

const getSubmittedOrder = (userId) => client.apiClient.get(endpoint+orderPerUser+userId+'&orderStatus=submitted&sort=createdAt');

const getDeliveredOrder = (userId) => client.apiClient.get(endpoint+orderPerUser+userId+'&orderStatus=delivered');

const deleteItemFromOrder = (token, orderId) => {
    client.apiClient.setHeader('Authorization', 'Bearer ' + token);
    return client.apiClient.delete(endpoint+"/"+orderId);
  }

const postBillings = (token, orderId, address) => {
    client.apiClient.setHeader('Authorization','Bearer '+token)
    result = client.apiClient.post(endpoint+"/"+orderId+billings, {address});
    return result;
}
  export default {
    getOrderPerUser,
    getSubmittedOrder,
    getDeliveredOrder,
    deleteItemFromOrder,
    postBillings
}