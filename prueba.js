var express = require('express');
var app = express();

app.get('/', function (req, res) {
     res.send('Hello Mundo');
});
var server = app.listen(4000,function() {
var host = server.address().address;
var port = server.address().port;

console.log('Ejemplo app listening at http://%s:%s',host,port);
});


