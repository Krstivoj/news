import axios   from 'axios';
import config  from '../utils/constants';

const baseUrl = config.API_HOST;

const httpClient = axios.create({
    baseURL: baseUrl,
});

httpClient.defaults.headers.common['Accept'] = "application/json";
httpClient.defaults.headers.post['Content-Type'] = "application/json";
httpClient.defaults.adapter = require('axios/lib/adapters/http');

httpClient.interceptors.request.use((axiosConfig) => {
    axiosConfig.headers['X-Api-Key'] = config.API_KEY;
    return axiosConfig;
}, (error) => {
    return Promise.reject(error);
});

httpClient.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return error.response;
});
export default httpClient;
