class Devices {
  constructor (app) {
    this.app = app;
  }


  /**
   * List devices registered for a pass
   *
   * @callback callback
   * @param templateId {number, string} - Template ID of pass
   * @param passId {number, string} - Pass ID
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  list (templateId, passId, callback) {
    const path = '/templates/' + templateId + '/passes/' + passId + '/devices';

    this.app.httpRequest ({ path }, callback);
  }
}

module.exports = Devices;
