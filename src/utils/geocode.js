const request = require("request");

const geoCode = (address, cb) => {
  const geoUrl = `http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGF2aWRvbGFvbHV3YTI0MCIsImEiOiJja280NjlxeXcwOHAyMnhteXFkeGdlZzE3In0.Vh8sBFyYd_fzm9zFxHTL8w&limit=1`;

  request({ uri: geoUrl, json: true }, (error, response, body) => {
    if (error) {
      cb("Unable to access the mabbox geocoding", null);
    } else if (response.statusCode !== 200) {
      cb("Unable to find the specified location, Try another search", null);
    } else {
      return cb(null, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        place_name: body.features[0].place_name,
      });
    }
  });
};

module.exports = {
  geocode: geoCode,
};
