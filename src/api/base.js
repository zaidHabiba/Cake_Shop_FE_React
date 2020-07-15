import axios from 'axios';

export const BASE_URL = "http://192.168.1.163:8000";
export const DEPLOY_URL = "https://cakebe2.herokuapp.com";
export default axios.create({
    baseURL: BASE_URL
});