class Analytics {
  constructor (app) {
    this.app = app;
  }


  /**
   * List all analytics
   *
   * @callback callback
   * @param [params] {object} - Filter params
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  list (params, callback) {
    this.app.httpRequest ({ path: '/analytics', params }, callback);
  }


  /**
   * List analytics for created passes
   *
   * @callback callback
   * @param [params] {object} - Filter params
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  created (params, callback) {
    this.app.httpRequest ({ path: '/analytics/created', params }, callback);
  }


  /**
   * List analytics for redeemed passes
   *
   * @callback callback
   * @param [params] {object} - Filter params
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  redeemed (params, callback) {
    this.app.httpRequest ({ path: '/analytics/redeemed', params }, callback);
  }


  /**
   * List analytics for installed passes
   *
   * @callback callback
   * @param [params] {object} - Filter params
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  installed (params, callback) {
    this.app.httpRequest ({ path: '/analytics/installed', params }, callback);
  }
}

module.exports = Analytics;
