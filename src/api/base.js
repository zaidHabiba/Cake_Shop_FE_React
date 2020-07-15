import axios from 'axios';

export const BASE_URL = "http://192.168.1.163:8000";
export const DEPLOY_URL = "https://cake2be.herokuapp.com";
export default axios.create({
    baseURL: DEPLOY_URL
});