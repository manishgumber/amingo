
const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const app = express();
const User = require('./models/User');

const db = 'mongodb+srv://manishdb:gumber@cluster0-zrbb5.mongodb.net/test?retryWrites=true&w=majority';

//app.use(bodyParser.urlencoded({extended:false}));

mongoose
    .connect(db, {})
    .then(() => console.log("Db Connected"))
    .catch(err => console.log(err));


app.get('/',(req,res) => res.json({
    msg:"Hello Manish!!"
}));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Your application is running @ http://localhost:${port}`)); 