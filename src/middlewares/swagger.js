/* eslint-disable indent */
module.exports = {
  info: {
    version: '1.0.1',
    title: `Twitter-Backend-API ${process.env.NODE_ENV} Swagger Document`,
    description: 'Descriptions of endpoints in Twitter-Backend-API project.',
  },
  security: {
    UserAuth: {
      'type': 'apiKey',
      'in': 'header',
      'name': 'Authorization'
    },
    IntAuth: {
      'type': 'apiKey',
      'in': 'header',
      'name': 'Authorization'
    },
    RefreshAuth: {
      'type': 'apiKey',
      'in': 'header',
      'name': 'refresh_token'
    },
    RefreshKey: {
      'type': 'apiKey',
      'in': 'header',
      'name': 'Authorization'
    },
  },
  'servers': [
    // {
    //    'url': 'https://development.gigantic-server.com/v1',
    //    'description': 'Development server'
    // }

  ],
  baseDir: __dirname,
  filesPattern: '../routes/**/*.js',
  swaggerUIPath: '/docs',
  apiDocsPath: '/docs-download',
  notRequiredAsNullable: false,

  exposeApiDocs: true,
  swaggerUiOptions: {
    swaggerOptions: {
      persistAuthorization: true
    },
  },
};