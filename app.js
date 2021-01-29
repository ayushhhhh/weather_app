const express=require("express");
const app =express();



const https=require("https");
const { json } = require("express");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}))



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
    





    // res.send("Server is up and running.")
})

app.post("/", function(req,res){

    
    
    const city=req.body.cityName;
    const api_id='f8a51eaab9ca73985a766cb9d3c63087'
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api_id +"&units=metric"
    

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherdata=JSON.parse(data)
            const weatherdesc=weatherdata.weather[0].description


            const weathertemp = weatherdata.main.temp
            const icon = weatherdata.weather[0].icon
            
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"

            

            res.write("<P>the weather is currently "+ weatherdesc +"</p>");
            res.write("<h1>The temperature in "+city+" is " + weathertemp+" degrees celcius.</h1>");
            res.write("<img src="+imageURL+">")
            res.send();
        })



    })
})






app.listen(3000,function(){
    console.log("server is running on port 3000")
})