class Lists {
  constructor (app) {
    this.app = app;
  }


  /**
   * List all lists in your address book
   *
   * @callback callback
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  list (callback) {
    this.app.httpRequest ({ path: '/lists' }, callback);
  }


  /**
   * Get a list from your address book
   *
   * @callback callback
   * @param listId {string} - List ID
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  get (listId, callback) {
    this.app.httpRequest ({ path: '/lists/' + listId }, callback);
  }


  /**
   * Create a list in your address book
   *
   * @callback callback
   * @param list {object} - List parameters
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  create (list, callback) {
    const options = {
      path: '/lists',
      method: 'POST',
      json: {
        list
      }
    };

    this.app.httpRequest (options, callback);
  }


  /**
   * Update a list in your address book
   *
   * @callback callback
   * @param listId {string} - List ID
   * @param list {object} - List parameters
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  update (listId, list, callback) {
    const options = {
      path: '/lists/' + listId,
      method: 'PUT',
      json: {
        list
      }
    };

    this.app.httpRequest (options, callback);
  }


  /**
   * Delete a list from your address book
   *
   * @callback callback
   * @param listId {string} - List ID
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  delete (listId, callback) {
    const options = {
      path: '/lists/' + listId,
      method: 'DELETE'
    };

    this.app.httpRequest (options, callback);
  }
}

module.exports = Lists;
