var models = require('../models/models.js');

// get question - envia la pregunta
exports.question = function(req, res) 
{	models.Quiz.findAll().success(function(quiz) {
	res.render('examen/question', {pregunta: quiz[0].pregunta});
    });
};
// get answer -da la respuesta
exports.answer=function(req, res) 
{
    models.Quiz.findAll().success(function(quiz) {
    if (req.query.respuesta === quiz[0].respuesta)  {
	res.render('examen/answer', {respuesta: ' Correcto '}); }
	else {
	res.render('examen/answer', {respuesta: ' Incorrecto '}); }
    })
};
// datos del autor
exports.creditos=function(req, res)  {	 
        res.render('examen/creditos', {creditos:' CLAUDIA A RODRIGUEZ'}); };

console.log('carga quiz-_controller');
