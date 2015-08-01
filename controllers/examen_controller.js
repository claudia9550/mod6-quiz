var models = require('../models/models.js');

exports.load = function(req, res, next, quizId) 
{	models.Quiz.find(quizId).then 
        (function(quiz) { 
	 if (quiz) { req.quiz = quiz; next();  }
         else { next (new Error('No existe quizID=' + quizId));} 
       }
       ).catch(function(error) {next(error);});
};

exports.index = function(req, res) 
{	models.Quiz.findAll().then (function(quizes) {
	res.render('quizes/index',{quizes: quizes});
        }
	).catch(function(error) {next(error);});
	console.log('opcion get/index');
};
// get question - envia la pregunta   -/examen/:id
exports.show = function(req, res) 
{	res.render('quizes/show', {quiz: req.quiz});
	console.log('opcion get/show');  
};
// get answer -da la respuesta
exports.answer=function(req, res) 
{   var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta)  
	{ resultado = ' Correcto' }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado }); 
    console.log('opcion get/answer');  
};
// datos del autor
exports.creditos=function(req, res)  {	 
        res.render('quizes/creditos', {creditos:' CLAUDIA A RODRIGUEZ'}); };

console.log('carga quiz-_controller');
