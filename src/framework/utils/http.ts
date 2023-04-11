import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "./get-token";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NODE_API,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default http;
