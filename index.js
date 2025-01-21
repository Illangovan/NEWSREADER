const axios=require("axios");
const bodyParser = require("body-parser");
const express=require("express")
const mongoose=require("mongoose")
const app=express();
const port=process.env.PORT ||3000 ;

//Mongo db connection URL
const mongodbURL="mongodb+srv://andrewillango1212:gNKoIVjBk6yIcPLa@cluster0.feslzkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//creating schema for database
var userfeedback=mongoose.Schema(
    {
        name:String,
        mail:String,
        area:String
    }
)

var userModel=mongoose.model("Feedback",userfeedback);

//connecting to mongo db atlas
mongoose.connect(mongodbURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//creating mongodb connection
const connection=mongoose.connection
connection.once("open",()=>{
    console.log("mongo db connected")
})
   


///express middlewares
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));


var c=0;
var date=new Date();
date.setDate(date.getDate() - 2)
date.toISOString().split('T')[0];
//Endpoint for home page

app.get("/", async (req,res)=>{
    var response;
    c=0;
    try{
        response=await axios.get(`https://newsapi.org/v2/everything?q=india&from=2025-01-01&to=2024-01-20&pageSize=10&apiKey=1fc433b785934694b772265197cdd685`);

    }
    catch(err)
    {
        
    }
   res.render("index.ejs",{data:response.data.articles,start:0,end:10});
})


//Endpoint for different pagination
app.get("/next", async (req,res)=>{
    var response;
    c++;
    if(c<0)
        {
            c=0;
        }
    try{
        response=await axios.get("https://newsapi.org/v2/everything?q=india&from=2025-01-01&to=2024-01-20&apiKey=1fc433b785934694b772265197cdd685");
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
        response=await axios.get("https://newsapi.org/v2/everything?q=india&from=2025-01-01&to=2024-01-20&apiKey=1fc433b785934694b772265197cdd685");
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



//Feedback page
app.get("/feedback",(req,res)=>{
    
    res.render("feedback.ejs");
})

//Search news

app.get("/search",(req,res)=>{
    res.render("search.ejs");
})


//send search data
app.post("/searchdata", async (req,res)=>{

    var response;
    var c=0;
    var s=req.body["search"];
    try{
        if(s=="")
            {
                res.render("search.ejs")  
                c=1;
            }
            else
            {
        response=await axios.get(`https://newsapi.org/v2/everything?q=${s}&searchIn=title&language=en&apiKey=1fc433b785934694b772265197cdd685`);
            }
    }
    catch(err)
    {
        console.log("there is error");
        var da={
            articles:[]
        }
        res.render("search.ejs",{data:da});
        c=1;
    }
    if(c==0)
        {
            res.render("search.ejs",{data:response.data.articles});
        }
   
})


//collecting feedback from user

app.post("/submit", async (req,res)=>{

    console.log(req.body["name"])
    console.log(req.body["mail"])
    console.log(req.body["area"])

    const user=new userModel(req.body)
    try{
        await user.save();
    }
    catch(err){
        console.log("error in inserting");
    }
    res.redirect("/");
})

//Start Running a Server
app.listen(port,(err)=>{
    if(err) throw err;

    else{
        console.log(`Server is running on the port ${port}`)
    }
});