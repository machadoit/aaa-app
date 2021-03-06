// require('app-module-path').addPath(__dirname + '/src/app');
// process.env.NODE_ENV = 'production'

require('app-module-path').addPath(__dirname);
var express = require('express');
var http = require('http');
var jsx = require('node-jsx');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

jsx.install();

var PageSwitcher = require('app/common/PageSwitcher');

const i18next = require('global/i18nextReact').i18next;
const i18nextMiddleware = require('global/i18nextReact').i18nextMiddleware;

var app = express();
var pageSwitcher = new PageSwitcher();

app.use(i18nextMiddleware.handle(i18next));
app.post('/languages/missing/:lng/:ns.json',
         i18nextMiddleware.missingKeyHandler(i18next));
app.get('/languages/resources.json',
        i18nextMiddleware.getResourcesHandler(i18next));

app.use(express.static('build'));
app.use(express.static('src'));
app.use(express.static('content'));

app.get("/login", function(req, res) {
  res.send(pageSwitcher.serverString('loginPage', req));
});

app.get("/login", function(req, res) {
  res.send(pageSwitcher.serverString('loginPage', req));
});

app.get("/home", function(req, res) {
  res.send(pageSwitcher.serverString('homePage', req));
});

app.get("/trainings", function(req, res) {
  res.send(pageSwitcher.serverString('trainingsPage', req));
});

app.get("/assessments", function(req, res) {
  res.send(pageSwitcher.serverString('assessmentsPage', req));
});

app.get("/reports", function(req, res) {
  res.send(pageSwitcher.serverString('reportsPage', req));
});

app.get("/seasons", function(req, res) {
  res.send(pageSwitcher.serverString('seasonsPage', req));
});

var server = http.createServer(app);
server.listen(9090);
console.log("Listening to 9090");
