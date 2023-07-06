const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
// const request = require("request");
// const { captureRejectionSymbol } = require("events");
const ejs = require("ejs");
const axios = require("axios");

app.set("view engine", 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.render("main");
});

const about = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde perspiciatis natus harum voluptatem quibusdam adipisci, enim deleniti molestiae explicabo beatae. Culpa, iusto! Vero officia libero, adipisci deleniti dolores perferendis suscipit quos excepturi atque quisquam cumque exercitationem quae velit itaque neque. Voluptates totam soluta officiis. Sed, exercitationem corporis. Provident voluptatibus nobis vitae nisi iusto a deleniti vero, beatae, aut, libero amet explicabo necessitatibus! Harum aperiam, voluptatum similique odio distinctio error deserunt delectus cupiditate aspernatur molestias adipisci cum atque ducimus repellendus eaque deleniti quae eos doloribus magni architecto maxime omnis sapiente molestiae corporis? Maiores est praesentium repudiandae dicta explicabo numquam quos laborum?"


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
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.render("current",{
              query:query,
              temp:temp,
              weatherDescription:weatherDescription,
              feels_like:feels_like,
              min_temp:min_temp,
              max_temp:max_temp,
              
              humidity:humidity,
              imageUrl:imageUrl
            });

            // res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius </h1>");
            // res.write("<h3>Weather description :  " + weatherDescription + "</h3>");
            // res.write("<h3>Feels like :  " + feels_like + "</h3>");
            // res.write("<h3>Minimum Temperature :  " + min_temp + "degree celcius</h3>");
            // res.write("<h3>Maximum Temperature :  " + max_temp + "degree celcius</h3>");
            // // res.write("<h3>Pressure :  " + pressure + "</h3>");
            // res.write("<h3>Humidity :  " + humidity + "</h3>");
            // res.write("<img src = " + imageUrl + ">");
            // res.send();

        });
    });

    

});

function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}.png`;
}
app.get("/5days", function (req, res) {
    res.render("5days")
});

app.post("/5days", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "37b8ac2578a4715200e8300ccea8e007";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    axios.get(url)
        .then((response) => {
          // console.log(response.statusCode);
            const forecastData = response.data.list.slice(0,40);
            // console.log(forecastData);
            // console.log(forecastData);

            // forecastData.forEach(element => {

            //    const temp = forecastData.list[element].main.temp; 
            //    console.log(temp);
            // });
            // const temp = forecastData.list[0].main.temp;
            
            // console.log(temp);
            // res.send(temp);
            // Access and process the forecast data as needed
            // const arr =[];
            // for (let index = 0; index < 40; index++) {

                // console.log(response.statusCode);
                // const temp = forecastData.list[1].main.temp;
                // const feels_like =forecastData.list[1].main.feels_like;
                // const temp_min=forecastData.list[1].main.temp_min;
                // const temp_max=forecastData.list[1].main.temp_max;
                // const humidity = forecastData.list[1].main.humidity;
                // const weather = forecastData.list[1].weather[0].main;
                // const weatherDescription = forecastData.list[1].weather[0].description;

                // res.write("="+temp.toString());
                // res.write("="+feels_like.toString());
                // res.write("="+temp_min.toString());
                // res.write("="+temp_max.toString());
                // res.write("="+humidity.toString());
                // res.write("="+weather.toString());
                // res.write("="+weatherDescription.toString());
                // res.send();

            //     arr.push(temp,feels_like,temp_min,temp_max,humidity,weather,weatherDescription);


            const forecastItem = forecastData.map(forecast=>({
                timestamp: forecast.dt_txt,
                temp : forecast.main.temp,
                feels_like :forecast.main.feels_like,
                temp_min:forecast.main.temp_min,
                temp_max:forecast.main.temp_max,
                humidity : forecast.main.humidity,
                weather : forecast.weather[0].main,
                weatherDescription : forecast.weather[0].description,
                // icon1 : forecast.weather[0].icon,
                // imageUrl : `https://openweathermap.org/img/wn/${icon1}.png`
                weatherIcon: getWeatherIconUrl(forecast.weather[0].icon),
                
              }));

          //   res.send(`<html>
          //   <head>
          //     <title>Weather Forecast</title>
          //   </head>
          //   <body>
          //     <h1>Weather Forecast</h1>
          //     <ul>
          //       ${forecastItem.map(forecast => `
          //         <li>
          //           <strong>Timestamp:</strong> ${forecast.timestamp}<br>
          //           <strong>Temperature:</strong> ${forecast.temp}K<br>
          //           <strong>Feels Like:</strong> ${forecast.feels_like}K<br>
          //           <strong>Minimum Temperature:</strong> ${forecast.temp_min}K<br>
          //           <strong>Maximum Temperature:</strong> ${forecast.temp_max}K<br>
          //           <strong>Humidity:</strong> ${forecast.humidity}K<br>
          //           <strong>Weather:</strong> ${forecast.weather}K<br>
          //           <strong>Description:</strong> ${forecast.weatherDescription}
          //           <img src="${forecast.weatherIcon}" alt="${forecast.weatherDescription}">
          //         </li>
          //       `).join('')}
          //     </ul>
          //   </body>
          // </html>`)
                
            // }
            res.render("5daysdisplay",{
              // timestamp:timestamp,
              // temp:temp,
              // feels_like:feels_like,
              // temp_min:temp_min,
              // temp_max:temp_max,
              // humidity:humidity,
              // weatherDescription:weatherDescription,
              // weatherIcon:weatherIcon,
              // weatherDescription:weatherDescription
              forecastItem:forecastItem


            })
            
           
        })
        .catch((error) => {
            console.error('An error occurred:', error);
            
        });
});
// app.get("/about",function(res,req){

//     res.render("about");
// })
app.get("/about",function(req,res){
    res.render("about",{
        about:about
    })
})






app.listen(3000, function () {
    console.log("server is running at 3000");

});