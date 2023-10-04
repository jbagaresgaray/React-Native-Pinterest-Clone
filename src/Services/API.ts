import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Client-ID nllcFdEQkChHOLqrK9iw4AxrC8Hv-N7L8_ada60RgsU`,
  "X-Ratelimit-Limit": 1000,
  "X-Ratelimit-Remaining": 999,
};

const API = axios.create({
  baseURL: "https://api.unsplash.com",
  timeout: 30000,
  headers,
  transformResponse: (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      throw Error(
        `[requestClient] Error parsing response JSON data - ${JSON.stringify(
          error
        )}`
      );
    }
  },
});

API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: any) => {
    console.log("request error: ", error);
    Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    console.log("response error: ", error);
    const originalRequest = error.config;
    return Promise.reject(error);
  }
);

export default API;
