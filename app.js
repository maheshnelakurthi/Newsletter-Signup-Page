const express = require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();



app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res)
{
  const firstName=req.body.fName;
  const lastName=req.body.lName;
  const email=req.body.email;
  const data={
    members:[
      {
       email_address:email,
       status:"subscribed",
       merge_fields:
       {
         FNAME:firstName,
         LNAME:lastName
       }

      }
    ]
  };

  const jsonData=JSON.stringify(data);
  const url="this should be the url that requests to the mailchimp api "; // Enter the url to talk to mailchimp api here
  const options={
    method:"POST",
    auth:"unique key to authorize mailchimp api" // ENter ur unique key here

  }

const request=https.request(url,options, function(response)
{
  if(response.statusCode==200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }
  response.on("data", function(data){
    console.log(JSON.parse(data));
   });
});

request.write(jsonData);
request.end();


});

app.post("/failure",function(req,res)
{
  res.redirect("/");
});



app.listen(process.env.PORT || 3000,function()
{
  console.log("Server is up and running on port 3000");
});


// 886b115cd86a46907160c285cc4b696c-us14

// 4430621271
