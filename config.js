const config = {};
config.proxyPort = process.env.PROXY_PORT || 80;
config.proxy = process.env.PROXY || `http://localhost:3000`;
config.maxBodySize = process.env.MAX_BODY_SIZE || '16mb';
module.exports = config;
