export default (httpClient) => (resource) => ({

  get() {
    return httpClient.$get(`/api/${resource}`);
  },

  get_by_id(id) {
    return httpClient.$get(`/api/${resource}/${id}`);
  },

  create(payload) {
    return httpClient.$post(`/api/${resource}`, payload);
  },

  update(payload, id) {
    return httpClient.$put(`/api/${resource}/${id}`, payload);
  },

  delete(id) {
    return httpClient.$delete(`/api/${resource}/${id}`);
  },

});
