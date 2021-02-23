import { create } from 'apisauce';

//const url = 'http://localhost:5000';
const url = 'https://la-villa-pasta-backend.herokuapp.com';

const apiClient = create({
    baseURL: url
})

export default {
    apiClient,
    url
}