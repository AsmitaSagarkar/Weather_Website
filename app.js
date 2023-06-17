const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req,res){
    res.sendFile(__dirname + "/index.html");    
});
app.post("/",function(req,res){
    //console.log("post received");
    //console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "37b8ac2578a4715200e8300ccea8e007";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    const url1 = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q="+query+"&appid="+apiKey+"&units="+unit;
    //res.send("server is up and running");
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data" , function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            
            const feels_like = weatherData.main.feels_like;
            const min_temp=weatherData.main.temp_min;
            const max_temp = weatherData.main.temp_max;
            const pressure = weatherData.main.pressure;
            const humidity = weatherData.main.humidity;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = " http://openweathermap.org/img/wn/"+icon+"@2x.png";
            // res.send("<h1>The temperature in london is " + temp + " degree celcius and the weather description : " + weatherDescription + "</h1>");
            res.write("<h1>The temperature in "+query+" is " + temp + " degree celcius </h1>");
            res.write("<h3>Weather description :  " + weatherDescription + "</h3>");
            res.write("<h3>Feels like :  " + feels_like + "</h3>");
            res.write("<h3>Minimum Temperature :  " + min_temp + "</h3>");
            res.write("<h3>Maximum Temperature :  " + max_temp + "</h3>");
            res.write("<h3>Pressure :  " + pressure + "</h3>");
            res.write("<h3>Humidity :  " + humidity + "</h3>");
            res.write("<img src = " + imageUrl+">");
            res.send();
        });
    });
    
});








app.listen(3000,function() {
    console.log("server is running at 3000");
    
});