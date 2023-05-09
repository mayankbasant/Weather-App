const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=ba3b82d3ce184a1d00cd9c5e927507c9&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const weatherDesciption = weatherData.weather[0].description;
            const WeatherTemprature = weatherData.main.temp;
            const Icon = weatherData.weather[0].icon;
            const ImgURL= "http://openweathermap.org/img/wn/"+Icon+"@2x.png";
            res.write("<h1>the current temp in "+query+" is "+WeatherTemprature+" degree</h1>");
            res.write("<p>the current weather is "+weatherDesciption+"</p>");
            res.write("<img src ="+ImgURL+">");
            res.send()

        })
         
    })
})

app.listen(3000, function(){
    console.log("server is running");
})