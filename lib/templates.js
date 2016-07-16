class Templates {
  constructor (app) {
    this.app = app;
  }


  /**
   * List all templates owned by user
   *
   * @callback callback
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  list (page, callback) {
    let params = {
      page: 1
    };

    if (typeof page === 'function') {
      callback = page;
    } else {
      params.page = page;
    }

    this.app.httpRequest ({ path: '/templates', params }, callback);
  }


  /**
   * Get a template
   *
   * @callback callback
   * @param id {number, string} - Template ID
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  get (id, callback) {
    this.app.httpRequest ({ path: '/templates/' + id }, callback);
  }


  /**
   * Create a template
   *
   * @callback callback
   * @param params {object} - Template details
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  create (params, callback) {
    const options = {
      method: 'POST',
      path: '/templates',
      params
    };

    this.app.httpRequest (options, callback);
  }


  /**
   * Update a template
   *
   * @callback callback
   * @param id {number, string} - Template ID
   * @param params {object} - Template details
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  update (id, params, callback) {
    const options = {
      method: 'POST',
      path: '/templates/' + id,
      params
    };

    this.app.httpRequest (options, callback);
  }


  /**
   * Delete a template
   *
   * @callback callback
   * @param id {number, string} - Template ID
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  delete (id, callback) {
    this.app.httpRequest ({ method: 'DELETE', path: '/templates/' + id }, callback);
  }


  /**
   * Get editable fields for a template
   *
   * @callback callback
   * @param id {number, string} - Template ID
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  fields (id, callback) {
    this.app.httpRequest ({ path: '/templates/' + id + '/fields' }, callback);
  }
}

module.exports = Templates;
