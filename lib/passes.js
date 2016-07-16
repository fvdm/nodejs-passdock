class Passes {
  constructor (app) {
    this.app = app;
  }


  /**
   * List passes for template
   *
   * @callback callback
   * @param templateId {number, string} - Template ID
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  list (templateId, params, callback) {
    const options = {
      path: '/templates/' + templateId + '/passes',
      params
    };

    this.app.httpRequest (options, callback);
  }


  /**
   * Get a pass
   *
   * @callback callback
   * @param templateId {number, string} - Template ID
   * @param passId {number, string} - Pass ID
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  get (templateId, passId, callback) {
    const options = {
      path: '/templates/' + templateId + '/passes/' + passId
    };

    this.app.httpRequest (options, callback);
  }


  /**
   * Create a new pass
   *
   * @callback callback
   * @param templateId {number, string} - Template ID
   * @param passId {number, string} - Pass ID
   * @param params {object} - Parameters
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  create (templateId, params, callback) {
    const options = {
      path: '/templates/' + templateId + '/passes',
      method: 'POST',
      params
    };

    this.app.httpRequest (options, callback);
  }


  /**
   * Update a pass
   *
   * @callback callback
   * @param templateId {number, string} - Template ID
   * @param passId {number, string} - Pass ID
   * @param params {object} - Parameters
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  update (templateId, passId, params, callback) {
    const options = {
      path: '/templates/' + templateId + '/passes/' + passId,
      method: 'PUT',
      params
    };

    this.app.httpRequest (options, callback);
  }


  /**
   * Redeem or unredeem a pass
   *
   * @callback callback
   * @param templateId {number, string} - Template ID
   * @param passId {number, string} - Pass ID
   * @param params {object} - Parameters
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  redeem (templateId, passId, params, callback) {
    const options = {
      path: '/templates/' + templateId + '/passes/' + passId,
      method: 'PUT',
      params
    };

    if (typeof params === 'function') {
      callback = params;
      options.params = {
        redeemed: true
      };
    }

    this.app.httpRequest (options, callback);
  }


  /**
   * Delete a pass
   *
   * @callback callback
   * @param templateId {number, string} - Template ID
   * @param passId {number, string} - Pass ID
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  delete (templateId, passId, callback) {
    const options = {
      path: '/templates/' + templateId + '/passes/' + passId,
      method: 'DELETE'
    };

    this.app.httpRequest (options, callback);
  }


  /**
   * Search for passes by their serial number
   * for a specific template
   *
   * @callback callback
   * @param templateId {number, string} - Template ID
   * @param serial {string} - Pass serial number
   * @param [many = false] {boolean} - Get array of passes instead of just one
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  searchBySerial (templateId, serial, many, callback) {
    const options = {
      path: '/templates/' + templateId + '/passes/search',
      params: {
        serial_number: serial,
        many
      }
    };

    if (typeof many === 'function') {
      callback = many;
      options.params.many = false;
    }

    this.app.httpRequest (options, callback);
  }


  /**
   * Search for a pass by its 2D code
   * across all templates in account
   *
   * @callback callback
   * @param code {string} - 2D code to search for
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  searchBy2D (code, callback) {
    const options = {
      path: '/passes/search',
      params: {
        code
      }
    };

    this.app.httpRequest (options, callback);
  }
}

module.exports = Passes;
