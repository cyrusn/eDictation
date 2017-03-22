module.exports = [
  {
    method: 'GET',
    path: '/{param*}',
    config: {
      description: 'Serve Public Folder',
      tags: ['api', 'public'], // ADD THIS TAG
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          index: true
        }
      }
    }
  }
];
