export default ({ app, store }, inject) => {

  const pluginMethods = {

    today(u_params = {}) {
      return this.format(new Date(),u_params);
    },

    format(date, u_params = {}) {
      const params = {
        ...{
          locale: undefined, // Uses the client default locale
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        },
        ...u_params
      };

      return new Intl.DateTimeFormat(params.locale, params).format(date);
    },

    diff(date1, date2) {
      const milliseconds = date1.getTime() - date2.getTime();
      return {
        number: Math.ceil(milliseconds / (1000*60*60*24)),
        milliseconds
      };
    }

  };

  inject('dates', pluginMethods);

}