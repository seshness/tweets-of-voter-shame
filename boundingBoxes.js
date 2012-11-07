fs = require('fs')

var raw_data = fs.readFileSync(
  'data/restaurant-gps-bounding-boxes.json',
  'utf-8'
).trim();

var bboxes = JSON.parse(raw_data);

module.exports.contained = function(latitude, longitude) {
  console.time('bbox-contained')
  for (var i = 0, bbox = bboxes[i]; bbox != undefined; i += 1, bbox = bboxes[i]) {
    if (latitude > bbox[0] && latitude < bbox[2] &&
        longitude > bbox[1] && longitude > bbox[3]) {
      return true;
    } else {
      return false;
    }
  }
  var end = new Date().getTime();
};
