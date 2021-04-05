import { create } from 'apisauce';

//const url = 'https://la-villa-pasta-backend.herokuapp.com';
const url ='http://192.168.0.101:5000'

const apiClient = create({
    baseURL: url
})

export default {
    apiClient,
    url
}


