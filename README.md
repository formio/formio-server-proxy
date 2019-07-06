# Form.io Enterprise Server Proxy
A proxy server for the Form.io Enterprise Server. This allows you to write your own custom middleware around the Enterprise API's which enable things like.

 - Custom authentication
 - Form data manipulation and filtering.
 - Logging and analytics
 - And many more use cases.
 
### Creating a proxy
To create a new proxy, you just need to edit the ```proxies.js``` file. Inside of this file you will see the following.

```js
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
```

These are Express.js middleware routines, that allow for you to modify both the incoming traffic as well as the outgoing traffic (before, after). For example, if you wish to always set the ```x-token``` header in your requests you can do the following.

```js
module.exports = {
  before: [
    (req, res, next) => {
      req.headers['x-token'] = '1234567890';
      next();
    }
  ]
};
```
 
### Running this proxy.
This library can be launched as either a stand-alone node server, or as a Docker container. To run a local version of this proxy, you can run the following.

```
docker-compose up
```

You will need to make sure you include the LICENSE along with the environment variables in order to run the Enterprise server. You can also run this as a stand-alone docker container using the following command.

```
docker run -itd \
  -e "PROXY=http://localhost:3000" \
  --restart unless-stopped \
  --name formio-proxy \
  --network formio \
  --restart unless-stopped \
  -p 3010:80 \
  formio/formio-server-proxy;
```

This will connect this proxy to the ```http://localhost:3000``` endpoint, which should be an Enterprise server.
