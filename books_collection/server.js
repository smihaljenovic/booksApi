//server.js
var express = require('express'),
  compress = require('compression'),
  path = require('path'),
  app = express(),
  root = path.normalize(__dirname + '/books_collection/'),
  port = process.env.PORT || 2200;

app.use(compress());
app.use(express.static(root, {
  etag: true,
  setHeaders: (res, path) => {
    if(path.endsWith('index.html')) {
      res.setHeader('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate')
      res.setHeader('Pragma', 'no-cache')
      res.setHeader('Expires', 'Wed, 12 Jan 1980 05:00:00 GMT')
    }
  }
}));

app.get('*', function (req, res) {
  res.sendFile(path.join(root + '/index.html'));
});

app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});
