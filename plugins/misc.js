export default ({ app, store }, inject) => {

  const pluginMethods = {

    makeData(data) {
      const formData = new FormData();
      for(const[k,v] of Object.entries(data)) {
        formData.append(k,v);
      }
      return formData;
    }

  };

  inject('misc', pluginMethods);

}