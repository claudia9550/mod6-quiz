// get question - envia la pregunta
exports.question=function(req, res) 
{	 res.render('examen/question', {pregunta: 'Capital de Italia'});
};
// get answer -da la respuesta

exports.answer=function(req, res) 
{
 	if(req.query.respuesta === 'Roma')  {
	res.render('examen/answer', {respuesta: ' Correcto '}); }
	else {
	res.render('examen/answer', {respuesta: ' Incorrecto '}); }
};
// datos del autor

exports.creditos=function(req, res)  {	 
        res.render('examen/creditos', {creditos:' CLAUDIA A RODRIGUEZ'}); };

console.log('carga quiz-_controller');
