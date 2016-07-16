const Passdock = require ('passdock');
const passdock = new Passdock ({
  token: 'authentication token'
});

passdock.templates.list (console.log);
