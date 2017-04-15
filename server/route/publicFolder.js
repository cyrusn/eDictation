module.exports = [{
  method: 'GET',
  path: '/{file*}',
  config: {
    auth: false,
    description: 'Serve Public Folder',
    tags: ['api', 'public'], // ADD THIS TAG
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true,
        listing: true
      }
    }
  }
}]
