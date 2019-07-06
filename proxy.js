'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const proxy = require('http-proxy-middleware');
const async = require('async');
const app = express();
const config = require('./config.js');
const proxies = require('./proxies.js');

// Allow for JSON API's
app.use(bodyParser.urlencoded({
  extended: true,
  limit: config.maxBodySize
}));
app.use(bodyParser.json({
  limit: config.maxBodySize
}));
app.use(methodOverride('X-HTTP-Method-Override'));

// Proxy the API server.
app.use(proxies.before.concat(proxy({
  target: config.proxy,
  changeOrigin: true,
  selfHandleResponse: true,
  onProxyRes: (proxyRes, req, res) =>
    async.applyEachSeries(proxies.after, proxyRes, req, res)(() => proxyRes.pipe(res))
})));

// Listen to the port.
app.listen(config.proxyPort, () => {
  console.log('Application Server proxy running on port ' + config.proxyPort);
});

