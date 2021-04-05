import client from './client';

const endpoint = '/users';

const getAllUsers = (token) => {
    client.apiClient.setHeader('Authorization','Bearer '+token);
    return client.apiClient.get(endpoint);
 
}

const getUserById = (token, userId) => {
    client.apiClient.setHeader('Authorization','Bearer '+token);
    return client.apiClient.get(endpoint+"/"+userId);
 
}

const updateUser = (userId,phone,address) => client.apiClient.put(endpoint+"/"+userId, {phone,address});

export default {
    getUserById,
    getAllUsers,
    updateUser
}