class Registrations {
  constructor (app) {
    this.app = app;
  }


  /**
   * Create a user account at Passdock.com
   *
   * @callback callback
   * @param user {object} - Parameters
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  create (user, callback) {
    const options = {
      path: '/registrations',
      method: 'POST',
      params: {
        user
      }
    };

    this.app.httpRequest (options, callback);
  }
}

module.exports = Registrations;
