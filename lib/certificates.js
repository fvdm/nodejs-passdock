class Certificates {
  constructor (app) {
    this.app = app;
  }


  /**
   * List all certificates uploaded by user
   *
   * @callback callback
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  list (callback) {
    this.app.httpRequest ({ path: '/certificates' }, callback);
  }
}

module.exports = Certificates;
