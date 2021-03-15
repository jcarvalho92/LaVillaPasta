import client from './client';

const endpoint = '/users';

const getAllUsers = (token) => {
    client.apiClient.setHeader('Authorization','Bearer '+token);
    return client.apiClient.get(endpoint);
 
}

const updateUser = (userId,phone,address) => client.apiClient.put(endpoint+"/"+userId, {phone,address});

export default {
    getAllUsers,
    updateUser
}