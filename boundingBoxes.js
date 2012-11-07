fs = require('fs')

fs.readFile('data/ca-polling-locations-gps-bounding-boxes-oneline.csv', 'utf-8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  exports.all = data;
  // console.log(exports.all);
});
