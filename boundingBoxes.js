fs = require('fs')

module.exports = fs.readFileSync(
  'data/ca-polling-locations-gps-bounding-boxes-oneline.csv',
  'utf-8'
).trim();
