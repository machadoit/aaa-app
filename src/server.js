var express = require('express');
var http = require('http');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var jsx = require('node-jsx');

jsx.install();

var loginPage = require('./app/login/LoginPage');

var app = express();

app.use(express.static('src'));
app.use(express.static('build'));
app.use(express.static('content'));

app.get("/",function(req,res){
  var props = {
    languages: [{code:"de",name:"Deutsch"},{code:"en",name:"English"}]
  }
  res.send(ReactDOMServer.renderToString(React.createElement(loginPage,props)));
});

var server = http.createServer(app)
server.listen(9090);
