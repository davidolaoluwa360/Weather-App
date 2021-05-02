const request = require("request");

const forecast = ({ latitude: lat, longitude: log, place_name: place }, cb) => {
  const weatherUrl = `http://api.weatherstack.com/current?access_key=e941333caa0afd8b1c5bac096ba2202b&query=${log},${lat}&units=f`;

  request({ uri: weatherUrl, json: true }, (error, { body }) => {
    if (error) {
      cb("Unable to access the weatherstack", null);
    } else if (body.error) {
      cb(body.error.type + ": " + body.error.info, null);
    } else {
      cb(null, {
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        place_name: place,
      });
    }
  });
};

module.exports = {
  forecast: forecast,
};
