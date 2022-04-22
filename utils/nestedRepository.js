const mapUriParams = (uri, params) => {
  for(const[k,v] of Object.entries(params)) {
    uri = uri.replace(`:${k}`,v);
  }
  return uri;
}

const getUriNormalized = (uri, nestedParams = {}) => {
  return nestedParams instanceof Object
    ? mapUriParams(`/api/${uri}`, nestedParams)
    : `/api${uri}`
}

export default (httpClient) => (uri) => ({

  delete_by(params) {
    return httpClient.$delete(getUriNormalized(`${uri}`, params));
  }

  // get_nested(params) {
  //   return httpClient.$get(getUriNormalized(uri, params));
  // },

  // get_by_id_nested(id, params) {
  //   return httpClient.$get(getUriNormalized(`${resource}/${id}`, params));
  // },

  // create_nested(payload,params) {
  //   return httpClient.$post(getUriNormalized(uri, params),payload);
  // },

  // update_nested(payload, id, params) {
  //   return httpClient.$put(getUriNormalized(`${resource}/${id}`, params), payload);
  // },

  // delete_nested(id, params) {
  //   return httpClient.$delete(getUriNormalized(`${resource}/${id}`, params));
  // },

});
