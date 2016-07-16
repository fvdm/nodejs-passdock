class Sessions {
  constructor (app) {
    this.app = app;
  }


  /**
   * Create a new user session
   * and get the API token
   *
   * @callback callback
   * @param email {string} - Email used for every login
   * @param password {string} - Desired password
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  authenticate (email, password, callback) {
    const options = {
      path: '/sessions',
      method: 'POST',
      json: {
        user: {
          email,
          password
        }
      }
    };

    this.app.httpRequest (options, callback);
  }
}

module.exports = Sessions;
