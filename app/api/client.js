import { create } from 'apisauce';

const url = 'http://localhost:5000';

const apiClient = create({
    baseURL: url
})

export default {
    apiClient,
    url
}


