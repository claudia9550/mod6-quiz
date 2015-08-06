var models = require('../models/models.js');

exports.load = function(req, res, next, quizId) 
{	models.Quiz.find(quizId).then 
        (function(quiz) { 
	 if (quiz) { req.quiz = quiz; next();  }
         else { next (new Error('No existe quizId =' + quizId));} 
       }
       ).catch(function(error) {next(error);});
};

exports.index = function(req, res) 
{	models.Quiz.findAll().then 
	(function(quizes) {
	res.render('quizes/index.ejs',{quizes: quizes, errors: [] });}
	).catch(function(error) {next(error);});
	console.log('opcion get/index');
};
// get question - envia la pregunta   -/examen/:id
exports.show = function(req, res) 
{	res.render('quizes/show', {quiz: req.quiz, errors: [] });
	console.log('opcion get/show');  
};
// 
exports.answer = function(req, res) 
{   var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta)  
	{ resultado = 'Correcto' }
    res.render('quizes/answer', 
	       {quiz: req.quiz, respuesta: resultado, errors: [] }); 
    console.log('opcion get/answer');  
};
//	crea nuevo objeto
exports.new = function(req, res) 
{	var quiz = models.Quiz.build(
	{pregunta:"pregunta", respuesta:"respuesta"});
	res.render('quizes/new',{quiz: quiz, errors: [] });
	console.log('opcion exports.new ');
};
// crea en BD respuesta y pregunta
exports.create = function(req, res) 
{	var quiz = models.Quiz.build( req.body.quiz );
        console.log('opcion exports.create +', req.body.quiz );
	quiz.validate().then (function(err) 
        {
           console.log('opcion exports.create err +', err );
           if (err)
	   { res.render('quizes/new',{quiz: quiz, errors: err.errors});
	     console.log('opcion exports.create con error');}
           else
           { quiz.save({fields: ["pregunta", "respuesta"]})
	     .then (function() {res.redirect('/quizes')}) }
        });
        console.log('opcion exports.create salida');
};
//  edita la pregunta   
exports.edit = function(req, res) 
{	var quiz = req.quiz;
        res.render('quizes/edit', {quiz: quiz, errors: [] });
	console.log('opcion exports.edit', quiz);  
};
// actualiza en BD respuesta y pregunta
exports.update = function(req, res) 
{	req.quiz.pregunta  = req.body.quiz.pregunta;
        req.quiz.respuesta = req.body.quiz.respuesta;
	console.log('opcion exports.update ', req.body.quiz.pregunta);

	req.quiz.validate().then (function(err) 
        {
           if (err)
	   { res.render('quizes/edit',{quiz: req.quiz, errors: err.errors});
	     console.log('opcion exports.create con error');}
           else
           {req.quiz.save({fields: ["pregunta", "respuesta"]})
	     .then (function() {res.redirect('/quizes');}); }
        });
        console.log('opcion exports.update salida');
};
//  borra la pregunta   
exports.destroy = function(req, res) 
{	req.quiz.destroy().then( function()
        { res.redirect('/quizes');})
        .catch(function(error) {next(error)});
	console.log('opcion exports.destroy');  
};
// datos del autor
exports.creditos = function(req, res)  
{	res.render('quizes/creditos', 
        {title:' Creditos: CLAUDIA A RODRIGUEZ', 
        errors: [] }); 
};

exports.buscar_txt = function(req, res)
{    var texto = req.query.busqueda;
     console.log('opcion ', req.query.busqueda);
     if (texto)
     { var texto = "%" + texto.replace("","%") + "%";
       console.log('opcion texto', texto);
       models.Quiz.findAll({where:["pregunta like ?",texto]})
       .then(function(quizes)    
       { res.render('quizes/buscar_txt',{quizes:quizes,errors:[] } );
       })
       .catch(function(error) {next(error);})
     }
     else 
     {  console.log('No hay textos similares');
        models.Quiz.findAll().then (function(quizes)  {
        res.render('quizes/buscar_txt',
        {quizes:quizes, errors: []} )  })
     }
};

console.log('carga quiz-_controller');
