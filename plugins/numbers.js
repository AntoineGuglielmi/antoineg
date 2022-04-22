export default ({ app, store }, inject) => {

  const pluginMethods = {

    format(number, u_params = {}) {
      const params = {
        ...{
          locale: 'fr-FR', // Uses the client default locale
          style: 'decimal',
          currency: 'EUR',
          currencyDisplay: 'symbol',
          minimumIntegerDigits: 1,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        },
        ...u_params
      };

      return new Intl.NumberFormat(params.locale, params).format(number);
    }

  };

  inject('numbers', pluginMethods);

}