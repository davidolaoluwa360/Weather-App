const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const { geocode } = require("./utils/geocode");
const { forecast } = require("./utils/forecast");

//* setup path for the express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//* setup express to serve files in the public directory
app.use(express.static(publicDirPath));

//* setup express configuration for templating engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//* GET/
app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Atebisun David" });
});

//* GET/about
app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Atebisun David" });
});

//* GET/Help
app.get("/help", (req, res) => {
  res.render("help", { title: "Help Desk", name: "Atebisun David" });
});

//* GET/Weather
app.get("/weather", (req, res) => {
  const address = req.query.address ? req.query.address : "boston";
  geocode(address, (error, data) => {
    if (error) {
      return res.send({ error: error });
    }

    forecast(data, (error, { temperature, feelslike, place_name }) => {
      if (error) {
        return res.send({ error: error });
      }

      res.send({
        temperature: temperature,
        feelslike: feelslike,
        place: place_name,
      });
    });
  });
});

//* 404 page
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Atebisun David",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server listening on port http://localhost:3000");
});
