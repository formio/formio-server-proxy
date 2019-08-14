const request = require('request-promise-native');
const jwt = require('jsonwebtoken');

module.exports = {
  before: [
    (req, res, next) => {
      // This is an example of changing out the authentication tokens for form.io tokens.
      // You must know the JWT Secret set on the server to generate the token.

      // Request the user from your server using the Authentication header or cookies.
      request({
        method: 'GET',
        uri: 'https://reqres.in/api/users/2',
        headers: {
          'Authentication': req.headers.authentication
        }
      })
        .then((response) => {
          try {
            const user = JSON.parse(response);

            const token = jwt.sign({
              external: true,
              form: {
                _id: 'USERFORMID' // Replace with the user resource id in your project
              },
              project: {
                _id: 'PROJECTID' // Replace with the project id.
              },
              user: {
                _id: user.data.id, // Can be any string.
                data: user.data,
                roles: [
                  'ROLEIDTOGRANT' // Add the role ids to grant this user in the project.
                ]
              }
            }, process.env.JWT_SECRET);

            // Add Form.io jwt token to headers.
            req.headers['x-jwt-token'] = token;
            next();
          }
          catch (err) {
            return next(err);
          }
        })
        .catch(next);
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
