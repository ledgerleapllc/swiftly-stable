export const setToken = (token) => {
  localStorage.setItem('ACCESS-TOKEN', token);
};

export const removeToken = () => {
  localStorage.removeItem('ACCESS-TOKEN');
};

export const getToken = () => localStorage.getItem('ACCESS-TOKEN');

export const getRefreshToken = () => localStorage.getItem('REFRESH-TOKEN') || '';

export const setRefreshToken = (token) => {
  localStorage.setItem('REFRESH-TOKEN', token);
};

export const getTempToken = () => localStorage.getItem('TEMP-TOKEN');

export const setTempToken = (token) => {
  localStorage.setItem('TEMP-TOKEN', token);
};

export const removeTempToken = () => {
  localStorage.removeItem('TEMP-TOKEN');
};

export const setGuid = (id) => {
  localStorage.setItem('GUID', id);
};

export const removeGuid = () => {
  localStorage.removeItem('GUID');
};

export const getGuid = () => localStorage.getItem('GUID');
