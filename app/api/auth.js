import client from './client';

const endpoint = '/auth';
const loginPath = '/login';
const registerPath = '/register';
const logoutPath = '/logout';

const login = (email,password) => client.apiClient.post(endpoint+loginPath, {email, password});
const register = (name, email,phone,password,address) => client.apiClient.post(endpoint+registerPath, {name,email,phone,password,address});
const logout = () => client.apiClient.get(endpoint+logoutPath);

export default {
    login,
    register,
    logout
}