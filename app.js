const   express     = require("express"),
        app         = express(),
        request     = require("request");

app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render("search");
});

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

app.listen(3000, () => console.log("Express Applicatie gestart op poort 3000"));