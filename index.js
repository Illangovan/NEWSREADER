const axios=require("axios")
const express=require("express")
const app=express();
const port=3000;



app.use(express.static(__dirname + '/public'));


//Endpoint for home page
app.get("/", async (req,res)=>{
    var response;
    try{
        response=await axios.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=1fc433b785934694b772265197cdd685");
        console.log(response.data.articles[5])
        console.log(response.data.articles.length)
    }
    catch(err)
    {
        console.log(err);
    }
    res.render("index.ejs",{data:response.data.articles});
})





//Start Running a Server
app.listen(port,(err)=>{
    if(err) throw err;

    else{
        console.log(`Server is running on the port ${port}`)
    }
});