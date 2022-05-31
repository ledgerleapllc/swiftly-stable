import axios from 'axios';
import { getTempToken, getToken, removeGuid, removeToken } from './auth';

const API_DOMAIN = process.env.REACT_APP_BASE_URL;
export const STATUS_CODE = {
  NO_INTERNET: 0,
  REQUEST_TIMEOUT: 1,
  UNEXPECTED: 2,
};

const exception401 = [
  'admin/confirm-mfa',
  'user/confirm-mfa',
  'admin/update-email',
  'admin/update-mfa',
  'admin/update-password',
];

export class ErrorHandler {
  status;
  message;

  constructor(e) {
    // Error request timeout
    if (e.status && e.message) {
      this.status = e.status;
      this.message = e.message;
      return;
    }
    if ((e.code && e.code === 'ECONNABORTED') || e?.response?.status === 408) {
      this.status = STATUS_CODE.REQUEST_TIMEOUT;
      this.message = STATUS_CODE.REQUEST_TIMEOUT;
    } else if (e?.response?.status === 401 && !exception401.includes(e?.response.config.url)) {
      this.status = e?.response?.status;
      this.message = e?.response?.data?.detail;
      if (getToken()) {
        window.location.href = '/auth/login';
        removeToken();
      }
      removeGuid();
    } else {
      this.status = e?.response?.status || STATUS_CODE.UNEXPECTED;
      this.message = e?.response?.data?.detail || 'Something wrong. Please try again !';
    }
  }
}
export class ApiService {
  axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${API_DOMAIN}/`,
      timeout: 600000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.axiosInstance.interceptors.request.use((_config) => {
      const token = getToken() || getTempToken();
      if (token) {
        _config.headers.Authorization = `Bearer ${token}`;
      }
      return _config;
    });
    this.axiosInstance.interceptors.response.use(
      async (response) => {
        return response;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );
  }

  makeRequest(method, url, moreConfigs = {}) {
    return this.axiosInstance({
      method,
      url,
      ...moreConfigs,
    });
  }
}
