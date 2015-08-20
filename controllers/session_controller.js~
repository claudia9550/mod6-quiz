// MW de autorizacion de accesos HTTP restringidos
exports.loginRequired = function(req,res, next)
{        if (req.session.user)
 	    {next();}
         else
            {res.redirect('/login');}
};

// get login - formulario de acceso
exports.new = function(req, res) 
{	var errors = req.session.errors || {};
        req.session.errors = {};	
        res.render('sessions/new',{errors: errors});
	console.log('opcion exports.new session ')
};
// post/login - Crea la sesion
exports.create = function(req, res) 
{    var login    = req.body.login;
     var password = req.body.password;
     var userController = require('./user_controller');
     console.log('opcion antes exports.create session ', req.body.login)
     userController.autenticar(login,password, function(error,user)
     {  if (error) {
 	req.session.errors=[{"message": 'Se produjo un error'+error}];
        res.redirect("/login");
	return;
     }
  // crea re.session.user y almacena los campos id & password
     req.session.user = {id:user.id, username:user.username};
     res.redirect(req.session.redir.toString());
    });        
    console.log('opcion  salida exports.create session  ')
};
// delete/logout - Destruye la sesion
exports.destroy = function(req, res)
{    	delete req.session.user;
	res.redirect(req.session.redir.toString());
        console.log('opcion exports.destroy session')
}
console.log('carga session_controller');
