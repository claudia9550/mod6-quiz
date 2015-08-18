var users = { admin: {id:1, username: "admin", password:"1234"},
	      luna : {id:2, username: "luna",  password:"4321"},
	      pepe : {id:3, username: "pepe",  password:"5678"}
            };

exports.autenticar = function(login, password, callback) 
{	if (users[login])
        {  if (password === users[login].password)
	   {callback(null,users[login]);}
           else
       	   {callback(new Error('Password errado')); }
        }
        else 
        {callback(new Error('No existe el usuario')); }
};
console.log('carga user_controller');
