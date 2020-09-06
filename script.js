const express = require("express") // Express framework - To install use:npm install express.js --save
const path = require('path') // path to find the directory path

const app = express() 
const fs = require('fs') // file system to read the furniture data from furniture.json.

// Hosting port (Configurable)
var PORT = process.env.PORT || 3000 
  
// View Engine Setup 
app.set("views", path.join(__dirname)) 
app.set("view engine", "ejs") 

// Enable CORS - Allowing client to request this server for data.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update (*) to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/** This method return the furniture data based on client request
 * Input: client Request(Query parameter - category)
 * 
      Developer                   Date
 *  Tejasree Bejjanki           05-Sep-2020
 */
app.get("/getFurniture", function(req, res){ 
    // reading the data from file in the directory.(For any modifications look into the file furniture.json).
    var data = fs.readFileSync('furniture.json');
    // retrieving the value of query parameter "Category"
    var category = req.query.category;
    // Parse the buffer data into a json object
    var elements = JSON.parse(data);
    // filter the data based on category value requested by client(Server side filtering)
    elements = elements.filter( ele => category.includes(ele.category)); //include,filter are the inbuild metthods provided by JS 
    // send the data back to client
    res.send(elements);
}) 

// Listening to the port 3000(configured above at line 7)
app.listen(PORT, function(error){ 
    // throw error if any error occured while created the server on configured port
    if(error) throw error 
    
    console.log("Server created Successfully on PORT", PORT) 
}) 