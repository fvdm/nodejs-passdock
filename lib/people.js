class People {
  constructor (app) {
    this.app = app;
  }


  /**
   * List all people in account
   *
   * @callback callback
   * @param [page = 1] {number} - Filter page, per 50 records
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  list (page, callback) {
    const params = {
      page: !callback ? 1 : page
    };

    this.app.httpRequest ({ path: '/people', params }, callback);
  }


  /**
   * Get a person
   *
   * @callback callback
   * @param personId {string} - Person ID
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  get (personId, callback) {
    this.app.httpRequest ({ path: '/people/' + personId }, callback);
  }


  /**
   * Create a person
   *
   * @callback callback
   * @param person {object} - Parameters
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  create (person, callback) {
    const options = {
      path: '/people',
      method: 'POST',
      json: {
        person
      }
    };

    this.app.httpRequest (options, callback);
  }


  /**
   * Update a person
   *
   * @callback callback
   * @param personId {string} - Person ID
   * @param params {object} - Parameters
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  update (personId, person, callback) {
    const options = {
      path: '/people/' + personId,
      method: 'PUT',
      json: {
        person
      }
    };

    this.app.httpRequest (options, callback);
  }


  /**
   * Delete a person
   *
   * @callback callback
   * @param personId {string} - Person ID
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  delete (personId, callback) {
    const options = {
      path: '/people/' + personId,
      method: 'DELETE'
    };

    this.app.httpRequest (options, callback);
  }


  /**
   * Get editable fields for create and update
   *
   * @callback callback
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  fields (callback) {
    this.app.httpRequest ({ path: '/people/fields' }, callback);
  }
}

module.exports = People;
