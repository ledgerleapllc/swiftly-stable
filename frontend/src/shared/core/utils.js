import { format } from 'date-fns';

export const removeEmptyField = (obj) => {
  const temp = { ...obj };
  return Object.keys(temp)
    .filter((k) => temp[k])
    .reduce((a, k) => ({ ...a, [k]: temp[k] }), {});
};

export const formatDate = (time, formatType = 'yyyy-MM-dd hh:mm:ss') => {
  if (!time) return '';
  const timeConvert = new Date(time);
  if (timeConvert.toString() === 'Invalid Date') return timeConvert.toString();
  return format(timeConvert, formatType);
};

export const fakeFilterListApi = (data, payload) => {
  if (!data) return { items: [], hasMore: false };
  let temp = data;
  // search
  if (payload.search) {
    temp = temp.filter((x) => {
      return Object.values(x).some((y) => y.includes(payload.search));
    });
  }
  // sort
  if (payload.sort_key) {
    temp.sort((a, b) => {
      if (!isNaN(parseInt(a[payload.sort_key])) && !isNaN(parseInt(b[payload.sort_key]))) {
        if (parseInt(a[payload.sort_key]) < parseInt(b[payload.sort_key])) return -1;
        if (parseInt(a[payload.sort_key]) > parseInt(b[payload.sort_key])) return 1;
        return 0;
      } else {
        if (a[payload.sort_key] < b[payload.sort_key]) return -1;
        if (a[payload.sort_key] > b[payload.sort_key]) return 1;
        return 0;
      }
    });
    if (payload.sort_direction === 'desc') {
      temp = temp.reverse();
    }
  }
  const offsetStart = payload?.limit * (payload?.page - 1);
  const offsetEnd = payload?.limit * payload?.page;
  const items = temp.slice(offsetStart, offsetEnd);
  const hasMore = items.length >= payload.limit;
  return { items, hasMore };
};

export const calcStablecoinRate = (amount, price) => {
  return amount / price;
};
