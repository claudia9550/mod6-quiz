//indice de las routes
var express = require ('express');
var router = express.Router();

var examencontroller = require('../controllers/examen_controller');

// ruta general
router.get('/', function(req,res) 
{	res.render('index', {title: 'Quiz'});
});

// autoload de comandos con :quizId
router.param('quizId',examencontroller.load);

// toma ruta especializada
router.get('/quizes',                      examencontroller.index);
router.get('/quizes/:quizId(\\d+)',        examencontroller.show);
router.get('/quizes/:quizId(\\d+)/answer', examencontroller.answer);
router.get('/quizes/creditos', 	           examencontroller.creditos);

module.exports = router;
console.log('carga archivo de rutas - /quizzes - router.get');


