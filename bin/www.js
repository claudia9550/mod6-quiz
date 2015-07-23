#!/usr/bin/env node
var debug = require('debug')('examen');
var app   = require('../app'); 

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'),function() 
{
debug ('Express Server listening on port ' + server.address().port);
});
