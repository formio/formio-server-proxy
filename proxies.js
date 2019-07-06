module.exports = {
  before: [
    (req, res, next) => {
      console.log('Before proxy 1 called');
      next();
    },
    (req, res, next) => {
      console.log('Before proxy 2 called');
      next();
    }
  ],
  after: [
    (proxyRes, req, res, next) => {
      console.log('After proxy 1 called');
      next();
    },
    (proxyRes, req, res, next) => {
      console.log('After proxy 2 called');
      next();
    }
  ]
};
