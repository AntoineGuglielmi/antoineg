const params = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}

export default (httpClient) => (resource) => ({

  get() {
    return httpClient.$get(`/api/${resource}`, params);
  },

  get_by_id(id) {
    return httpClient.$get(`/api/${resource}/${id}`, params);
  },

  create(payload) {
    return httpClient.$post(`/api/${resource}`, payload, params);
  },

  update(payload, id) {
    return httpClient.$put(`/api/${resource}/${id}`, payload, params);
  },

  delete(id) {
    return httpClient.$delete(`/api/${resource}/${id}`, params);
  },

});
