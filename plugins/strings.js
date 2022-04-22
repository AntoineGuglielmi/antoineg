export default ({ app, store }, inject) => {

  const pluginMethods = {

    ucfirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    random(length = 6) {
      let caracters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      caracters = caracters.repeat(length);
      caracters = this.shuffle(caracters);
      return caracters.substring(0,length);
    },

    shuffle(str) {
      return str.split('').sort(function(){return 0.5-Math.random()}).join('');
    }

  };

  inject('strings', pluginMethods);

}