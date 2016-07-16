class Campaigns {
  constructor (app) {
    this.app = app;
  }


  /**
   * List all campaigns
   *
   * @callback callback
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  list (callback) {
    this.app.httpRequest ({ path: '/campaigns' }, callback);
  }


  /**
   * Get a campaign
   *
   * @callback callback
   * @param id {number, string} - Campaign ID
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  get (id, callback) {
    this.app.httpRequest ({ path: '/campaigns/' + id }, callback);
  }


  /**
   * Create a campaign
   *
   * @callback callback
   * @param params {object} - Campaign details
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  create (params, callback) {
    const json = {
      campaign: params
    };

    this.app.httpRequest ({ path: '/campaigns', json }, callback);
  }


  /**
   * Update a campaign
   *
   * @callback callback
   * @param id {number, string} - Campaign ID
   * @param params {object} - Campaign details
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  update (id, params, callback) {
    const json = {
      campaign: params
    };

    this.app.httpRequest ({ path: '/campaigns/' + id, json }, callback);
  }


  /**
   * Delete a campaign
   *
   * @callback callback
   * @param id {number, string} - Campaign ID
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  delete (id, callback) {
    this.app.httpRequest ({ method: 'DELETE', path: '/campaigns/' + id }, callback);
  }


  /**
   * Deliver a campaign
   *
   * @callback callback
   * @param id {number, string} - Campaign ID
   * @param [force = false] {boolean} - Deliver to as many contact as you have credits
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  deliver (id, force, callback) {
    const params = {
      force: false
    };

    if (typeof force === 'function') {
      callback = force;
    } else {
      params.force = force;
    }

    this.app.httpRequest ({ path: '/campaigns/' + id, params }, callback);
  }


  /**
   * List all campaign kinds
   *
   * @callback callback
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  kinds (callback) {
    this.app.httpRequest ({ path: '/campaigns/kinds' }, callback);
  }
}

module.exports = Campaigns;
