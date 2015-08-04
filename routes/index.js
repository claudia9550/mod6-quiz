//indice de las routes
var express = require ('express');
var router = express.Router();

var examencontroller = require('../controllers/examen_controller');

// ruta general
router.get('/', function(req,res) 
{	res.render('index', {title: 'Quiz', errors: [] });
});

// autoload de comandos con :quizId
router.param('quizId', examencontroller.load);

// toma ruta especializada
router.get('/quizes',			   examencontroller.index);
router.get('/quizes/:quizId(\\d+)',        examencontroller.show);
router.get('/quizes/:quizId(\\d+)/answer', examencontroller.answer);
router.get('/quizes/new',                  examencontroller.new);
router.post('/quizes/create',              examencontroller.create);
router.get('/quizes/:quizId(\\d+)/edit',   examencontroller.edit);
router.put('/quizes/:quizId(\\d+)',        examencontroller.update);
router.delete('/quizes/:quizId(\\d+)',     examencontroller.destroy);
router.get('/quizes/creditos', 	           examencontroller.creditos);

module.exports = router;
console.log('carga archivo de rutas - /quizes - router.get');


