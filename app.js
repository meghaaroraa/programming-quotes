import express from "express";
import bodyParser from "body-parser";
import https from "https";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.get("/about", (req,res) => {
    res.render("about.ejs");
})

app.post("/random", (req,res) => {
    const url = "https://programming-quotesapi.vercel.app/api/random";

    https.get(url, function(response){
        response.on("data", function(data){
            const quoteData = JSON.parse(data);
            res.render("quote.ejs",{
                author: quoteData.author,
                quote: quoteData.quote
            });
        });
    })
});

app.post("/authorName", (req,res) => {
    const authorName = req.body.authorName
    const url = "https://programming-quotesapi.vercel.app/api/random?author=" + authorName;

    https.get(url, function(response){
        response.on("data", function(data){
            const quoteData = JSON.parse(data);
            res.render("quote.ejs",{
                author: quoteData.author,
                quote: quoteData.quote
            });
        });
    })
});

app.post("/bulk", (req,res) => {
    const url = "https://programming-quotesapi.vercel.app/api/bulk";

    https.get(url, function(response){
        response.on("data", function(data){
            const quoteData = JSON.parse(data);
            res.render("quote.ejs",{
                bulk: quoteData
            });
        });
    })

});

app.post("/home", (req,res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });