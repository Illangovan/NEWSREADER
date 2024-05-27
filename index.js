const axios=require("axios")
const express=require("express")
const app=express();
const port=3000;



app.use(express.static(__dirname + '/public'));
var c=0;

//Endpoint for home page
app.get("/", async (req,res)=>{
    var response;
    c=0;
    try{
        response=await axios.get("https://newsapi.org/v2/everything?q=india&from=2024-05-26&to=2024-05-26&apiKey=1fc433b785934694b772265197cdd685");
        console.log(response.data.articles.length)
    }
    catch(err)
    {
        console.log(err);
    }
    res.render("index.ejs",{data:response.data.articles,start:0,end:10});
})


//Endpoint for different pagination
app.get("/next", async (req,res)=>{
    var response;
    c++;
    try{
        response=await axios.get("https://newsapi.org/v2/everything?q=india&from=2024-05-25&to=2024-05-25&apiKey=1fc433b785934694b772265197cdd685");
        console.log(c)
        console.log(response.data.articles.length)
    }
    catch(err)
    {
        console.log(err);
    }
    res.render("index.ejs",{data:response.data.articles,start:c*10,end:(c*10)+10});
})

app.get("/prev", async (req,res)=>{
    var response;
    c--;
    try{
        response=await axios.get("https://newsapi.org/v2/everything?q=india&from=2024-05-25&to=2024-05-25&apiKey=1fc433b785934694b772265197cdd685");
        console.log(c)
        console.log(response.data.articles.length)
    }
    catch(err)
    {
        console.log(err);
    }
    res.render("index.ejs",{data:response.data.articles,start:c*10,end:(c*10)+10});
})


//Category endpoints

//Business category endpoint
app.get("/business", async (req,res)=>{
    var response;
    try{
        response=await axios.get("https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=1fc433b785934694b772265197cdd685");
    console.log(response.data.articles.length)
    }
    catch(err)
    {
        console.log(err);
    }
    res.render("pages/business.ejs",{data:response.data.articles});
})

//Entertainment category endpoint
app.get("/entertainment", async (req,res)=>{
    var response;
    try{
        response=await axios.get("https://newsapi.org/v2/top-headlines?category=entertainment&language=en&apiKey=1fc433b785934694b772265197cdd685");
   
    }
    catch(err)
    {
        console.log(err);
    }
    res.render("pages/entertainment.ejs",{data:response.data.articles});
})

//Health category Endpoint
app.get("/health", async (req,res)=>{
    var response;
    try{
        response=await axios.get("https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=1fc433b785934694b772265197cdd685");
  
    }
    catch(err)
    {
        console.log(err);
    }
    res.render("pages/health.ejs",{data:response.data.articles});
})


//Sports category endpoints
app.get("/sports", async (req,res)=>{
    var response;
    try{
        response=await axios.get("https://newsapi.org/v2/top-headlines?category=sports&language=en&apiKey=1fc433b785934694b772265197cdd685");
   
    }
    catch(err)
    {
        console.log(err);
    }
    res.render("pages/sports.ejs",{data:response.data.articles});
})

//Technology category endpoints

app.get("/technology", async (req,res)=>{
    var response;
    try{
        response=await axios.get("https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=1fc433b785934694b772265197cdd685");
    }
    catch(err)
    {
        console.log(err);
    }
    res.render("pages/technology.ejs",{data:response.data.articles});
})





//Search news

app.get("/search",(req,res)=>{
    res.render("search.ejs");
})


//Start Running a Server
app.listen(port,(err)=>{
    if(err) throw err;

    else{
        console.log(`Server is running on the port ${port}`)
    }
});