// Definicion del modelo de Comentarios con validacion

module.exports = function(sequelize, DataTypes) 
{ return sequelize.define(
       'Comment',
       {texto:  { type: DataTypes.STRING, 
                  validate: {notEmpty: {msg: '-> Falta Incluir Comentario'}} }
       });
}
