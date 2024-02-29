import axios from 'axios';
import endpoints from './endpoints';

const apiClient = axios.create({
    baseURL: endpoints.baseUrl,
});

export default apiClient;
