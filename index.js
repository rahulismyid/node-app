require("./core/server");
/*
var express = require('express');
var app = express();
var settings = require('./settings');
//var db = require('./core/db');
    var post  = {from:'me', to:'you', msg:'hi'};
app.get('/',function(req,res){
    settings.query('select * from admin', function(err, result) 
    {
      if (err) throw err;
      res.send(result);
    });
});

app.listen(2000);
console.log('API running on port 9000');
*/
/*
var express = require('express');
var app = express();
var db = require('./settings');

app.get('/',function(req,res){
    var post  = {from:'me', to:'you', msg:'hi'};
    db.query('select * from admin', function(err, result){
      if (err) throw err;
      res.send(result);
    });
});
*/
/*
app.get('/save',function(req,res){
    var post  = {from:'me', to:'you', msg:'hi'};
    db.query('INSERT INTO messages SET ?', post, function(err, result) {
      if (err) throw err;
    });
});
*/
/*
var express = require('express');
var app = express();

app.listen(9000);
console.log('API running on port 9000');*/