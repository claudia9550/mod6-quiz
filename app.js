// importar paquetes middleware
var express = require('express');
var path    = require('path');
var favicon = require('serve-favicon');
var logger  = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session  = require('express-session');
// asociados routes
var routes  = require('./routes/index');
var app = express();

// view engine setup & generador de vistas
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');

app.use(partials());

// Favicon - Icono Amigable
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session({secret:'mi secreto'}));//
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

//Helpers dinamicos
app.use(function(req,res,next)
{	if(!req.path.match(/\/login|\/logout/))
        { req.session.redir  = req.path;}
        res.locals.session = req.session; // hace visible las vistas locales.
        console.log('carga la sesion en locales login', req.session)
	next();
});
// Implementa proceso de auto logout despues de 2 min
app.use(function(req,res,next)
{   
     if(!req.session.user)
     {req.session.tiempo_conexion = new Date().getTime();
      console.log('Tiempo inicial de conexion', req.session.tiempo_conexion)}
     else
      {
        if ((new Date().getTime()-req.session.tiempo_conexion) > 120000)   
           { delete req.session.user;
             res.redirect("/login");
             console.log('tiempo desconexion', 
                        (new Date().getTime()-req.session.tiempo_conexion))  }
        else {req.session.tiempo_conexion = new Date().getTime();
              console.log('tiempo conectado', req.session.tiempo_conexion) }
       }
      next();
});

// asocia rutas a gestores
app.use('/',routes);

console.log('valida middleware y rutas - incluye favicon.ico');

//	error ruta de gestores
app.use(function(req, res, next)
{	var err = new Error ('Not found');
	err.status = 404;
	next(err);
});

//gestion de errores durante el desarrollo-- imprimire stacktrace
if (app.get('env') === 'development') 
{	
    app.use(function(err, req, res, next) 
    {	
    res.status(err.status || 500);
    res.render('error', { message: err.message, error:err, errors: [] });
    });
}
//gestion errorres de produccion
app.use(function(err, req, res, next)
{   res.status(err.status || 500);
    res.render('error', { message: err.message, error:{}, errors: [] });
});

//exportar comando de arranque
module.exports=app;

console.log('carga comando de arranque salida app.js');

