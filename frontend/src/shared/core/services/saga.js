import { ApiService, ErrorHandler } from './api';
import qs from 'qs';

function createURL(uri, query) {
  const queryParams = qs.stringify(query, { skipNulls: true });
  let paramsUrl;
  let url;
  if (typeof uri[uri.length - 1] !== 'string') {
    paramsUrl = uri.pop();
    url = uri.join('/');
    Object.keys(paramsUrl).forEach((x) => {
      url = url.replace(`:${x}`, paramsUrl[x]);
    });
  } else {
    url = uri.join('/');
  }
  return queryParams ? `${url}?${queryParams}` : url;
}

const apiService = new ApiService();

export function* get(uri, params = {}, moreConfig = { timeout: 60000 }) {
  const url = createURL(uri, params);
  try {
    const res = yield apiService.makeRequest('GET', url, moreConfig);
    return res.data;
  } catch (e) {
    throw new ErrorHandler(e);
  }
}

export function* post(uri, body = {}, params = {}, moreConfig = {}) {
  const url = createURL(uri, params);
  const config = {
    ...body,
    ...moreConfig,
  };
  try {
    const res = yield apiService.makeRequest('POST', url, config);
    return res.data;
  } catch (e) {
    throw new ErrorHandler(e);
  }
}

export function* put(uri, body = {}, params = {}, moreConfig = {}) {
  const url = createURL(uri, params);
  const config = {
    ...body,
    ...moreConfig,
  };
  try {
    const res = yield apiService.makeRequest('PUT', url, config);
    return res.data;
  } catch (e) {
    throw new ErrorHandler(e);
  }
}
