/*
Name:             passdock
Author:           Franklin van de Meent (https://frankl.in)
Source and docs:  https://github.com/fvdm/nodejs-passdock
Feedback:         https://github.com/fvdm/nodejs-passdock/issues
License:          Unlicense (public domain, see LICENSE file)
*/

const httpreq = require ('httpreq');

const rootPath = __dirname;

const Analytics = require (rootPath + '/lib/analytics.js');
const Campaigns = require (rootPath + '/lib/campaigns.js');
const Certificates = require (rootPath + '/lib/certificates.js');
const Devices = require (rootPath + '/lib/devices.js');
const Lists = require (rootPath + '/lib/lists.js');
const Passes = require (rootPath + '/lib/passes.js');
const People = require (rootPath + '/lib/people.js');
const Registrations = require (rootPath + '/lib/registrations.js');
const Sessions = require (rootPath + '/lib/sessions.js');
const Templates = require (rootPath + '/lib/templates.js');


/**
 * Callback an error
 *
 * @callback callback
 * @param msg {string} - Error.message
 * @param err {mixed, null} - Error.error
 * @param res {object} - httpreq response details
 * @param callback {function} - `function (err) {}`
 * @return {void}
 */

function doError (msg, err, res, callback) {
  let error = new Error (msg);

  error.statusCode = res && res.statusCode;
  error.error = err;
  callback (error);
}


/**
 * Process httpreq response
 *
 * @callback callback
 * @param err {Error, null} - Error
 * @param res {object} - Response details
 * @param callback {function} - `function (err, data) {}`
 * @return {void}
 */

function processResponse (err, res, callback) {
  let data = res && res.body || '';

  // httpreq error
  if (err) {
    callback (err);
    return;
  }

  // parse data
  try {
    data = JSON.parse (data);
  } catch (e) {
    doError ('Invalid response', e, res, callback);
    return;
  }

  // API error
  if (res.statusCode >= 300) {
    doError ('API error', data, res, callback);
    return;
  }

  // all good
  callback (null, data);
}


/**
 * Passdock API class
 */

class Passdock {
  constructor (set) {
    let key;

    this.rootPath = rootPath;

    // config defaults
    this.config = {
      timeout: 5000,
      endpoint: 'https://api.passdock.com/api/v1'
    };

    // config overrides
    if (set) {
      for (key in set) {
        this.config [key] = set [key];
      }
    }

    // load methods
    this.analytics = new Analytics (this);
    this.campaigns = new Campaigns (this);
    this.certificates = new Certificates (this);
    this.devices = new Devices (this);
    this.lists = new Lists (this);
    this.passes = new Passes (this);
    this.people = new People (this);
    this.registrations = new Registrations (this);
    this.sessions = new Sessions (this);
    this.templates = new Templates (this);
  }


  /**
   * Send HTTP request
   *
   * @callback callback
   * @param props {object} - Request details
   * @param props.path {string} - Request path after `/api/v1`
   * @param [props.method = GET] {string} - HTTP method: GET, POST, PUT, DELETE
   * @param [props.params] {object} - Parameters to send
   * @param [props.timeout = 5000] {number} - Request timeout in ms
   * @param callback {function} - `function (err, data) {}`
   * @return {void}
   */

  httpRequest (props, callback) {
    let key;
    let val;

    let options = {
      method: props.method || 'GET',
      url: this.config.endpoint + props.path,
      parameters: props.params instanceof Object ? props.params : {},
      json: props.json,
      timeout: props.timeout || this.config.timeout,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'node.js/passdoc (https://github.com/fvdm/nodejs-passdock)'
      }
    };

    // set API token
    if (this.config.token) {
      options.parameters.api_token = this.config.token;
    }

    // stringify JSON data
    for (key in options.parameters) {
      val = options.parameters [key];

      if (typeof val === 'object') {
        options.parameters [key] = JSON.stringify (val);
      }
    }

    // proxy response processing
    function httpResponse (err, res) {
      processResponse (err, res, callback);
    }

    // send request
    httpreq.doRequest (options, httpResponse);
  }
}

module.exports = Passdock;
