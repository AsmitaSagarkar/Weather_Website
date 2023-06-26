const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
// const request = require("request");
// const { captureRejectionSymbol } = require("events");
// const ejs = require("ejs");
const axios = require("axios");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});



app.post("/", function (req, res) {

    //console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "37b8ac2578a4715200e8300ccea8e007";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response) {
        console.log(response.statusCode);


        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const feels_like = weatherData.main.feels_like;
            const min_temp = weatherData.main.temp_min;
            const max_temp = weatherData.main.temp_max;

            const humidity = weatherData.main.humidity;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius </h1>");
            res.write("<h3>Weather description :  " + weatherDescription + "</h3>");
            res.write("<h3>Feels like :  " + feels_like + "</h3>");
            res.write("<h3>Minimum Temperature :  " + min_temp + "degree celcius</h3>");
            res.write("<h3>Maximum Temperature :  " + max_temp + "degree celcius</h3>");
            // res.write("<h3>Pressure :  " + pressure + "</h3>");
            res.write("<h3>Humidity :  " + humidity + "</h3>");
            res.write("<img src = " + imageUrl + ">");
            res.send();

        });
    });

    

});

app.get("/5days", function (req, res) {
    res.sendFile(__dirname + "/5DaysWeather.html");
});

app.post("/5days", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "37b8ac2578a4715200e8300ccea8e007";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    axios.get(url)
        .then((response) => {
            const forecastData = response.data;

            // Access and process the forecast data as needed
            for (let index = 0; index < 40; index++) {
                const temp = forecastData.list[index].main.temp;
                const feels_like =forecastData.list[index].main.feels_like;
                const temp_min=forecastData.list[index].main.temp_min;
                const temp_max=forecastData.list[index].main.temp_max;
                const humidity = forecastData.list[index].main.humidity;
                const weather = forecastData.list[index].weather[0].main;
                const weatherDescription = list[index].weather[0].description
                
                // console.log(temp);
            }
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
});






app.listen(3000, function () {
    console.log("server is running at 3000");

});