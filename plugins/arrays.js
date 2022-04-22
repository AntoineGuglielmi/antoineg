export default ({
  app,
  store
}, inject) => {

  const methods = {

    sumInObjectsArray(array, prop) {
      return array.reduce((a, b) => {
        return a + b[prop];
      }, 0);
    },

    sortByKey(array, key) {
      return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        // return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        return x.localeCompare(y);
      });
    }

  };

  inject('arrays', methods);

}
