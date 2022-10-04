const express = require('express');
const bodyParser = require('body-Parser');
const app = express();
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");
const port = 8080;


app.use(bodyParser.urlencoded({extented: true}));
app.use(express.static("public"));
app.get('/', function(req, res){

  res.sendFile(__dirname + "/signup.html");
});
app.post('/',function(req, res) {

  var name = req.body.name
  var surname = req.body.surname
  var mail = req.body.mail

  var data = {
    members: [ {
     email_address : mail,
     status: "subscribed",
     merge_fields : {
       FNAME : name,
       LNAME : surname
     }
 }]  }
 var jsonData = JSON.stringify(data);


 const url = "https://us11.api.mailchimp.com/3.0/lists/2d458240ae"
 // client.setConfig({apiKey: "1ff76bac6e6f6541ef93982e0b199e78",  server: "us11",});
 const options = {
   method: "POST",
   auth: "firad1:1ff76bac6e6f6541ef93982e0b199e78-us11"

 }
 const request = https.request(url,options, function(response) {
   if (response.statusCode === 200 ) {

       res.sendFile(__dirname + "/success.html");

   }else {

       res.sendFile(__dirname + "/failure.html");

   }

   response.on("data",function(data){
   console.log(JSON.parse(data));


  })
 })
  request.write(jsonData);
  request.end();


});
app.listen( port,function(){

  console.log("Server is running on 3030 port");
})

//1ff76bac6e6f6541ef93982e0b199e78-us11
// 2d458240ae.
