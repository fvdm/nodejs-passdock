const dotest = require ('dotest');
const Passdock = require ('./');

const config = {
  timeout: process.env.TEST_TIMEOUT,
  token: process.env.TEST_TOKEN
};

const app = new Passdock (config);

const analytics = app && app.analytics;
const campaigns = app && app.campaigns;
const certificates = app && app.certificates;
const devices = app && app.devices;
const lists = app && app.lists;
const passes = app && app.passes;
const people = app && app.people;
const registrations = app && app.registrations;
const sessions = app && app.sessions;
const templates = app && app.templates;


dotest.add ('Module interface', function (test) {
  test ()
    .isFunction ('fail', 'module.exports', Passdock)
    .isObject ('fail', 'interface', app)

    .isObject ('fail', '.analytics', analytics)
    .isFunction ('fail', '.analytics.list', analytics && analytics.list)
    .isFunction ('fail', '.analytics.created', analytics && analytics.created)
    .isFunction ('fail', '.analytics.redeemed', analytics && analytics.redeemed)
    .isFunction ('fail', '.analytics.installed', analytics && analytics.installed)

    .isObject ('fail', '.campaigns', campaigns)
    .isFunction ('fail', '.campaigns.list', campaigns && campaigns.list)
    .isFunction ('fail', '.campaigns.get', campaigns && campaigns.get)
    .isFunction ('fail', '.campaigns.create', campaigns && campaigns.create)
    .isFunction ('fail', '.campaigns.update', campaigns && campaigns.update)
    .isFunction ('fail', '.campaigns.delete', campaigns && campaigns.delete)
    .isFunction ('fail', '.campaigns.deliver', campaigns && campaigns.deliver)
    .isFunction ('fail', '.campaigns.kinds', campaigns && campaigns.kinds)

    .isObject ('fail', '.certificates', certificates)
    .isFunction ('fail', '.certificates.list', certificates && certificates.list)

    .isObject ('fail', '.devices', devices)
    .isFunction ('fail', '.devices.list', devices && devices.list)

    .isObject ('fail', '.lists', lists)
    .isFunction ('fail', '.lists.list', lists && lists.list)
    .isFunction ('fail', '.lists.get', lists && lists.get)
    .isFunction ('fail', '.lists.create', lists && lists.create)
    .isFunction ('fail', '.lists.update', lists && lists.update)
    .isFunction ('fail', '.lists.delete', lists && lists.delete)

    .isObject ('fail', '.passes', passes)
    .isFunction ('fail', '.passes.list', passes && passes.list)
    .isFunction ('fail', '.passes.get', passes && passes.get)
    .isFunction ('fail', '.passes.create', passes && passes.create)
    .isFunction ('fail', '.passes.update', passes && passes.update)
    .isFunction ('fail', '.passes.delete', passes && passes.delete)
    .isFunction ('fail', '.passes.redeem', passes && passes.redeem)
    .isFunction ('fail', '.passes.searchBySerial', passes && passes.searchBySerial)
    .isFunction ('fail', '.passes.searchBy2D', passes && passes.searchBy2D)

    .isObject ('fail', '.people', people)
    .isFunction ('fail', '.people.list', people && people.list)
    .isFunction ('fail', '.people.get', people && people.get)
    .isFunction ('fail', '.people.create', people && people.create)
    .isFunction ('fail', '.people.update', people && people.update)
    .isFunction ('fail', '.people.delete', people && people.delete)
    .isFunction ('fail', '.people.fields', people && people.fields)

    .isObject ('fail', '.registrations', registrations)
    .isFunction ('fail', '.registrations.create', registrations && registrations.create)

    .isObject ('fail', '.sessions', sessions)
    .isFunction ('fail', '.sessions.authenticate', sessions && sessions.authenticate)

    .isObject ('fail', '.templates', templates)
    .isFunction ('fail', '.templates.list', templates && templates.list)
    .isFunction ('fail', '.templates.get', templates && templates.get)
    .isFunction ('fail', '.templates.create', templates && templates.create)
    .isFunction ('fail', '.templates.update', templates && templates.update)
    .isFunction ('fail', '.templates.delete', templates && templates.delete)
    .isFunction ('fail', '.templates.fields', templates && templates.fields)

    .done ();
});


dotest.run ();
