import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// response code
export declare type RC_OK_TYPE = 0;
export declare type RC_BAD_REQUEST_TYPE = 1;
export declare type RC_UNAUTHORIZED_TYPE = 2;
export declare type RC_NOT_FOUND_TYPE = 3;
export declare type RC_INTERNAL_SERVER_ERROR_TYPE = 4;
declare const ResponseCodes: [
  RC_OK_TYPE, RC_BAD_REQUEST_TYPE, RC_UNAUTHORIZED_TYPE, RC_NOT_FOUND_TYPE, RC_INTERNAL_SERVER_ERROR_TYPE
];
export declare type ResponseCode = typeof ResponseCodes[number];

// response
export declare type JsonResponse<ResponseData = any> = {
  code: ResponseCode,
  msg: string | null,
  data: ResponseData | null,
}
// Error Http Status Code
const HTTP_SC_BAD_REQUEST = 400;
const HTTP_SC_UNAUTHORIZED = 401;
const HTTP_SC_FORBIDDEN = 403;
const HTTP_SC_NOT_FOUND = 404;
const HTTP_SC_INTERNAL_SERVER_ERROR = 500;

// create instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://192.168.1.105:8090/api',
  timeout: 10000,
});

// request interceptors
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && config.headers) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }
    return config;
  },
  (err: any) => {
    console.error(err);
  }
);

// response interceptors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response;
  },
  (err: any) => {
    if (err.response) {
      const { status } = err.response as AxiosResponse<any>;
      // check response status
      switch (status) {
        case HTTP_SC_BAD_REQUEST:
          return Promise.reject("400 BAD REQUEST");
        case HTTP_SC_UNAUTHORIZED:
          return Promise.reject("401 UNAUTHORIZED");
        case HTTP_SC_FORBIDDEN:
          return Promise.reject("403 FORBIDDEN");
        case HTTP_SC_NOT_FOUND:
          return Promise.reject("404 NOT FOUND");
        case HTTP_SC_INTERNAL_SERVER_ERROR:
          return Promise.reject("500 INTERNAL SERVER ERROR");
        default:
          break;
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
