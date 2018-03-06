// root of node application
const path = require('path'); // just part of node
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// 3rd party npm
const express = require('express');



// launch express app
var app = express();

// user publicPath for static
app.use(express.static(publicPath));

app.get('/', (req,res) => res.send());



app.listen(port, () => console.log(`Server is up and listening on ${port}`));

//console.log(__dirname + '/../public');
//console.log(publicPath);

//create new express app, configure express static middle ware, put server up on 3000, head to localhost:3000/ and see index.html