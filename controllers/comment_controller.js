var models = require('../models/models.js');

//	crea nuevo comentario
exports.new = function(req, res) 
{	res.render('comments/new.ejs',{quizid: req.params.quizId, errors: []});
	console.log('opcion comments/new ',req.params.quizid);
};
// crea en BD comentario identificando la pregunta con quizId
exports.create = function(req, res) 
{	var comment = models.Comment.build( 
        {texto: req.body.comment.texto, QuizId: req.params.quizId});
        console.log('opcion exports.create comentario');
        comment.validate().then (function(err) 
        { if (err)
	   {res.render('comments/new.ejs',
           {comment: comment, quizid: req.params.quizId, errors: err.errors});
	    console.log('opcion error comentario');}
          else
            { comment.save().then(function() 
             {res.redirect('/quizes/'+req.params.quizId)}) 
            }
         }// redireccion HTTp a lista de preguntas
        ).catch(function(error){next(error)});
};

console.log('carga comment_controller');
