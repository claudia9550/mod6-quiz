/**
 * Module dependencies.
 */

// importar paquetes middleware
var express = require('express');
var path    = require('path');
var favicon = require('serve-favicon');
var logger  = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
// asociados routes
var routes  = require('./routes/index');
var app = express();

// view engine setup & generador de vistas
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');

// Favicon - Icono Amigable
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

// asocia rutas a gestores
app.use('/',routes);

console.log('valida middleware y rutas - incluye favicon.ico');

//app.use(partials());

//	error ruta de gestores
app.use(function(req, res, next)
{	var err = new Error ('Not found');
	err.status = 404;
	next(err);
});

//gestion de errores durante el desarrollo-- imprimire stacktrace
if (app.get('env') === 'development') {	
        app.use(function(err, req, res, next) {	
        res.status(err.status || 500);
	res.render('error', { 
	message: err.message, 
        error:err});
	});
}
//gestion errorres de produccion
app.use(function(err, req, res, next)
{	res.status(err.status || 500);
	res.render('error', { 
        message: err.message, 
        error:{}
     });
});

//exportar comando de arranque
module.exports=app;

console.log('carga comando de arranque salida app.js');

