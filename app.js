const   express     = require("express"),
        app         = express(),
        request     = require("request");
        
// dotENV
require('dotenv').config();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Search route
app.get("/",(req,res)=>{
    res.render("search");
});

// Results route
app.get("/results", (req,res)=>{
    console.log(req.query);
    let selector = "&" + req.query.searchType + "=",
        term     =  selector + req.query.title,
        type     = "&type=" + req.query.type,
        y        = "&y=" + req.query.year,
        plot     = "&plot=full",
        page     = "&page=" + req.query.page;

    let url = "http://www.omdbapi.com/?apikey=" + process.env.OMDb_KEY  + term + type + y + plot + page;
    console.log(url);
    request(url , (err,resonse,body)=>{
        if(!err && resonse.statusCode==200) {
            var data=JSON.parse(body);
            // Get maximum number pages
            if(data["totalResults"]>0) {
                var numberOfPages=Math.ceil(data["totalResults"]/10);
                console.log("total Pages: " + numberOfPages);
                res.redirect("/results/" + req.query.page);
            } else {
                res.render("results", {data: data});
            }
        }
    });
});

app.get("/results/:page", (req,res) => {
    res.render("pagination");
});

// Express listener
app.listen(process.env.APP_PORT, () => console.log("Express Applicatie gestart op poort " + process.env.APP_PORT));