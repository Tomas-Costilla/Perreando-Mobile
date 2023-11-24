import axios from "axios";

export const server = axios.create({
    /* baseURL: "http://192.168.0.93:8080/api" */
    baseURL: "http://ec2-34-197-5-220.compute-1.amazonaws.com:8080/api"
})