//   Estructura Basica del Programa - Quiz

var path = require('path');

//Postgres DATABASE_URL = postgres://user:passwd@host:port/database
//SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match (/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name 	= (url[6]||null);
var user 	= (url[2]||null);
var pwd 	= (url[3]||null);
var protocol 	= (url[1]||null);
var dialect	= (url[1]||null);
var port	= (url[5]||null);
var host 	= (url[4]||null);
var storage	= process.env.DATABASE_STORAGE

// Cargar modelo ORM
var Sequelize = require ('sequelize');

// Usa BBDD SQLite or Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
	{ dialect:  protocol,
	  protocol: protocol,
	  port:     port,
	  host:     host,
	  storage:  storage,
	  oitNull:  true
         });

//Importar definicion tabla de Quiz
var quiz_path = path.join(__dirname,'quiz');
var Quiz      = sequelize.import(quiz_path);

exports.Quiz = Quiz;

// Usar BBDD SQLITE:
var sequelize = new Sequelize(null, null, null, 
		{dialect: "sqlite", storage: "quiz.sqlite"} );

// Importar la def. de la tabla Qui en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz;   // exporta la definicion

//  sequelyze.sync() crea e inicializa tabla de preguntas en BD
sequelize.sync().success(function()   {
   //		success.. ejecuta el manejador en la tabla
	Quiz.count().success(function(count)	{
	if (count === 0)  {
	   Quiz.create( {pregunta: 'Capital de Italia',
		         respuesta: 'Roma'   }) 
       .success(function(){console.log('Base de datos ha sido inicializada')});
	};
     });
 });


