//indice de las routes
var express = require ('express');
var router  = express.Router();
var examencontroller  = require('../controllers/examen_controller');
var commentcontroller = require('../controllers/comment_controller');
var sessioncontroller = require('../controllers/session_controller');

// ruta general
router.get('/', function(req,res) 
{         res.render('index', {title: 'Quiz', errors: [] }); });

// autoload de comandos con :quizId
router.param('quizId', examencontroller.load);

// definicion de las rutas de sesion
router.get('/login',   sessioncontroller.new);  // formulario de accesso 
router.post('/login', sessioncontroller.create); // crea sesion
router.get('/logout', sessioncontroller.destroy); // destruye sesion

// toma ruta especializada for Quiz
router.get('/quizes',			   examencontroller.index);
router.get('/quizes/:quizId(\\d+)',        examencontroller.show);
router.get('/quizes/:quizId(\\d+)/answer', examencontroller.answer);
router.get('/quizes/new',                  sessioncontroller.loginRequired,
        examencontroller.new);
router.post('/quizes/create',              sessioncontroller.loginRequired, examencontroller.create);
router.get('/quizes/:quizId(\\d+)/edit',   sessioncontroller.loginRequired,  examencontroller.edit);
router.put('/quizes/:quizId(\\d+)',        sessioncontroller.loginRequired,  examencontroller.update);
router.delete('/quizes/:quizId(\\d+)',     sessioncontroller.loginRequired, examencontroller.destroy);
router.get('/quizes/creditos', 	           examencontroller.creditos);
router.get('/quizes/buscar_txt', 	   sessioncontroller.loginRequired, examencontroller.buscar_txt);

// toma ruta especializada for Comentario
router.get('/quizes/:quizId(\\d+)/comments/new', commentcontroller.new);
router.post('/quizes/:quizId(\\d+)/comments',    commentcontroller.create);

module.exports = router;
console.log('carga archivo de rutas Quiz & Comentario & Session -index.js');


