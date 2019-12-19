const   express     = require("express"),
        app         = express(),
        request     = require("request");

        
// dotENV
require('dotenv').config();

app.set("view engine", "ejs");

// Search route
app.get("/",(req,res)=>{
    res.render("search");
});

// Results route
app.get("/results", (req,res)=>{
    let query = req.query.zoeken;
    let url = "http://www.omdbapi.com/?apikey=7ed4327f&s=" + query
    
    request(url , (err,resonse,body)=>{
        if(!err && resonse.statusCode==200) {
            let data=JSON.parse(body)
            res.render("results", {data: data});
        }
    });
});

// Express listener
app.listen(process.env.APP_PORT, () => console.log("Express Applicatie gestart op poort " + process.env.APP_PORT));