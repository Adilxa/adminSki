import axios from "axios";

const BASE_URl = "http://localhost:3000";


const $api = axios.create({
    baseURL:BASE_URl,
    withCredentials:false
})



export default $api;