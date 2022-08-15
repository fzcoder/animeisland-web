import { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance, { JsonResponse } from "./axios";
import { message } from "ant-design-vue";

// response code
const RC_OK = 0;
const RC_BAD_REQUEST = 1;
const RC_UNAUTHORIZED = 2;
const RC_NOT_FOUND = 3;
const RC_INTERNAL_SERVER_ERROR = 4;
export declare type RC_OK_TYPE = 0;
export declare type RC_BAD_REQUEST_TYPE = 1;
export declare type RC_UNAUTHORIZED_TYPE = 2;
export declare type RC_NOT_FOUND_TYPE = 3;
export declare type RC_INTERNAL_SERVER_ERROR_TYPE = 4;
declare const ResponseCodes: [
  RC_OK_TYPE, RC_BAD_REQUEST_TYPE, RC_UNAUTHORIZED_TYPE, RC_NOT_FOUND_TYPE, RC_INTERNAL_SERVER_ERROR_TYPE
];
export declare type ResponseCode = typeof ResponseCodes[number];
export declare type PageResultSet<T = Record<string, any>> = {
  records: T[],
  total: number,
}

/* const gotoLoginPage = () => {
  setTimeout(() => {
    localStorage.clear();
    window.location.href = '/login';
  }, 1500);
} */

// Get
export async function get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
  try {
    const { data: result } = await axiosInstance.get<JsonResponse<T>, AxiosResponse<JsonResponse<T>, D>, D>(url, config);
    const { code, msg, data } = result;
    switch (code) {
      case RC_BAD_REQUEST:
        message.error(msg || '请求错误 Bad Request');
        return Promise.reject(msg || '请求错误 Bad Request');
      case RC_UNAUTHORIZED:
        message.error(msg || '无访问权限 Unauthorized');
        // gotoLoginPage(); // 跳转到登录页
        return Promise.reject(msg || '无访问权限 Unauthorized');
      case RC_NOT_FOUND:
        message.error(msg || '资源不存在 Not Found');
        return Promise.reject(msg || '资源不存在 Not Found');
      case RC_INTERNAL_SERVER_ERROR:
        message.error(msg || '服务器异常 Internal Server Error');
        return Promise.reject(msg || '服务器异常 Internal Server Error');
      default:
        break;
    }
    if (data) {
      return Promise.resolve<T>(data);
    } else {
      return Promise.resolve<any>(null);
    }
  } catch(err: any) {
    return Promise.reject(err);
  }
}

export async function post<T = any, D = any>(url: string, requestBody?: any, config?: AxiosRequestConfig<D>): Promise<T> {
  try {
    const { data: result } = await axiosInstance.post<JsonResponse<T>, AxiosResponse<JsonResponse<T>, D>, D>(url, requestBody, config);
    const { code, msg, data } = result;
    switch (code) {
      case RC_BAD_REQUEST:
        message.error(msg || '请求错误 Bad Request');
        return Promise.reject(msg || '请求错误 Bad Request');
      case RC_UNAUTHORIZED:
        message.error(msg || '无访问权限 Unauthorized');
        // gotoLoginPage(); // 跳转到登录页
        return Promise.reject(msg || '无访问权限 Unauthorized');
      case RC_NOT_FOUND:
        message.error(msg || '资源不存在 Not Found');
        return Promise.reject(msg || '资源不存在 Not Found');
      case RC_INTERNAL_SERVER_ERROR:
        message.error(msg || '服务器异常 Internal Server Error');
        return Promise.reject(msg || '服务器异常 Internal Server Error');
      default:
        break;
    }
    if (data) {
      return Promise.resolve<T>(data);
    } else {
      return Promise.resolve<any>(null);
    }
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export async function put<T = any, D = any>(url: string, requestBody?: any, config?: AxiosRequestConfig<D>): Promise<T> {
  try {
    const { data: result } = await axiosInstance.put<JsonResponse<T>, AxiosResponse<JsonResponse<T>, D>, D>(url, requestBody, config);
    const { code, msg, data } = result;
    switch (code) {
      case RC_BAD_REQUEST:
        message.error(msg || '请求错误 Bad Request');
        return Promise.reject(msg || '请求错误 Bad Request');
      case RC_UNAUTHORIZED:
        message.error(msg || '无访问权限 Unauthorized');
        // gotoLoginPage(); // 跳转到登录页
        return Promise.reject(msg || '无访问权限 Unauthorized');
      case RC_NOT_FOUND:
        message.error(msg || '资源不存在 Not Found');
        return Promise.reject(msg || '资源不存在 Not Found');
      case RC_INTERNAL_SERVER_ERROR:
        message.error(msg || '服务器异常 Internal Server Error');
        return Promise.reject(msg || '服务器异常 Internal Server Error');
      default:
        break;
    }
    if (data) {
      return Promise.resolve<T>(data);
    } else {
      return Promise.resolve<any>(null);
    }
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export async function del<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
  try {
    const { data: result } = await axiosInstance.delete<JsonResponse<T>, AxiosResponse<JsonResponse<T>, D>, D>(url, config);
    const { code, msg, data } = result;
    switch (code) {
      case RC_BAD_REQUEST:
        message.error(msg || '请求错误 Bad Request');
        return Promise.reject(msg || '请求错误 Bad Request');
      case RC_UNAUTHORIZED:
        message.error(msg || '无访问权限 Unauthorized');
        // gotoLoginPage(); // 跳转到登录页
        return Promise.reject(msg || '无访问权限 Unauthorized');
      case RC_NOT_FOUND:
        message.error(msg || '资源不存在 Not Found');
        return Promise.reject(msg || '资源不存在 Not Found');
      case RC_INTERNAL_SERVER_ERROR:
        message.error(msg || '服务器异常 Internal Server Error');
        return Promise.reject(msg || '服务器异常 Internal Server Error');
      default:
        break;
    }
    if (data) {
      return Promise.resolve<T>(data);
    } else {
      return Promise.resolve<any>(null);
    }
  } catch(err: any) {
    return Promise.reject(err);
  }
}

export async function request<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
  try {
    const { data: result } = await axiosInstance(url, config);
    const { code, msg, data } = result;
    switch (code) {
      case RC_BAD_REQUEST:
        message.error(msg || '请求错误 Bad Request');
        return Promise.reject(msg || '请求错误 Bad Request');
      case RC_UNAUTHORIZED:
        message.error(msg || '无访问权限 Unauthorized');
        // gotoLoginPage(); // 跳转到登录页
        return Promise.reject(msg || '无访问权限 Unauthorized');
      case RC_NOT_FOUND:
        message.error(msg || '资源不存在 Not Found');
        return Promise.reject(msg || '资源不存在 Not Found');
      case RC_INTERNAL_SERVER_ERROR:
        message.error(msg || '服务器异常 Internal Server Error');
        return Promise.reject(msg || '服务器异常 Internal Server Error');
      default:
        break;
    }
    if (data) {
      return Promise.resolve<T>(data);
    } else {
      return Promise.resolve<any>(null);
    }
  } catch(err: any) {
    return Promise.reject(err);
  }
}