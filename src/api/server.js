import axios from "axios";

export const server = axios.create({
    baseURL: "http://192.168.0.93:8080/api"
})