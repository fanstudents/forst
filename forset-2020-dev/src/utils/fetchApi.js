import 'isomorphic-unfetch';

const queryObjToString = (obj) => {
  let string = '';
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (string === '') {
        string += `?${key}=${obj[key]}`;
      } else {
        string += `&${key}=${obj[key]}`;
      }
    }
  }
  return string;
};

const getApi = async (url, query) => {
  if (query && query !== Object(query)) {
    throw Error('wrong parameters');
  }
  const res = await fetch(`${url}${queryObjToString(query)}`, {
    credentials: 'include',
  });
  return {
    ok: await res.ok,
    body: await res.json(),
  };
};

/**
 *
 * @param url
 * @param body
 * @param options
 * @returns {Promise<{ok, body: any}>}
 */
const postApi = async (url, body, options = {}) => {
  // set options
  const defaultOptions = {
    credentials: 'include',
    'X-Requested-With': 'XMLHttpRequest',
    json: false,
  };
  const currentOptions = Object.assign(defaultOptions, options);
  // set body
  let data;
  if (typeof HTMLFormElement !== 'undefined' && body instanceof HTMLFormElement) {
    data = new FormData(body);
  } else if ((typeof FormData !== 'undefined' && body instanceof FormData) || body instanceof Object) {
    data = body;
  } else {
    throw Error('wrong parameters');
  }
  // set headers
  const headers = {
    'X-Requested-With': currentOptions['X-Requested-With'],
  };
  if (currentOptions.json) {
    headers['Content-Type'] = 'application/json';
  }
  // fetch
  const res = await fetch(url, {
    credentials: currentOptions.include,
    method: 'POST',
    headers,
    body: currentOptions.json ? JSON.stringify(data) : data,
  });
  return {
    ok: await res.ok,
    body: await res.json(),
  };
};

export { queryObjToString, getApi, postApi };
