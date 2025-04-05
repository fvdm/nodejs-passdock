/*
Name      : passdock
Source    : https://github.com/fvdm/nodejs-passdock
Feedback  : https://github.com/fvdm/nodejs-passdock/issues
License   : Unlicense (Public Domain, see LICENSE file)
*/

const { request } = require( 'https' );
const { stringify } = require( 'querystring' );

var app = {
  api: {
    host: 'api.passdock.com',
    path: '/api/v1/',
    timeout: 30,
    token: '',
  },
};

// Communication error
app.buildError = ( reason, response, requestBody ) => {
  return {
    reason: reason,
    response: {
      headers: response.headers,
      statusCode: response.statusCode,
      complete: response.complete,
    },
    request: {
      method: response.req.method,
      path: response.req.path,
      headers: response.req._headers,
      body: requestBody,
      finished: response.req.finished,
    },
  };
};

// Communicate
app.talk = function ( method, path, fields, cb ) {
  if ( !cb && typeof fields === 'function' ) {
    let cb = fields;
    let fields = {};
  }
	
  // build request
  fields.api_token = app.api.token;
  fields = stringify( fields );

  const options = {
    host: app.api.host,
    port: 443,
    path: app.api.path + path + ( method === 'GET' ? '?' + fields : '' ),
    method: method,
    agent: false,
    headers: {
      Accept: 'application/json',
      'User-Agent': 'fvdm/nodejs-passdock',
    },
  };
	
  if ( method !== 'GET' ) {
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    options.headers['Content-Length'] = fields.length;
  }
	
  // do request
  const req = request( options, response => {
    let data = '';
    response.on( 'data', d => { data += d; } );
		
    // process response
    response.on( 'end', () => {
      data = data.toString( 'utf8' ).trim();
			
      if ( response.statusCode >= 500 ) {
				
        // server trouble
        cb( data, app.buildError( 'server error', response, fields ) );
				
      } else if ( response.statusCode >= 200 && response.statusCode < 300 ) {
				
        // all good
        if ( data.match( /^(\{.*\}|\[.*\])$/ ) ) {
          cb( JSON.parse( data ), false );
        } else {
          cb( data, app.buildError( 'invalid data', response, fields ) );
        }
				
      } else {
				
        // API error
        cb( data, app.buildError( 'error', response, fields ) );
				
      }
    } );
		
    // request cut off
    response.on( 'close', err => {
      cb( data.toString( 'utf8' ), app.buildError( 'early disconnect', response, fields ) );
    } );
  } );
	
  req.setTimeout( app.api.timeout * 1000 );
	
  if ( method !== 'GET' ) {
    req.write( fields );
  }
	
  req.end();
}

// Templates
app.templates = {
  list: ( cb ) => app.talk( 'GET', 'templates', cb ),
  show: ( id, cb ) => app.talk( 'GET', `templates/${id}`, cb ),
  delete: ( id, cb ) => app.talk( 'DELETE', `templates/${id}`, cb ),
};

// Passes
app.passes = {
  list: ( tid, cb ) => app.talk( 'GET', `templates/${tid}/passes`, cb ),
  show: ( tid, id, cb ) => app.talk( 'GET', `templates/${tid}/passes/${id}`, cb ),
  delete: ( tid, id, cb ) => app.talk( 'DELETE', `templates/${tid}/passes/${id}`, cb ),
  create: ( tid, pass, cb ) => app.talk( 'POST', `templates/${tid}/passes`, { pass }, cb ),
  update: ( tid, pid, pass, cb ) => app.talk( 'PUT', `templates/${tid}/passes/${pid}`, { pass }, cb ),
};

// module magic
module.exports = app;
