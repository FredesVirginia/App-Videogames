const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
       },

    userCreated: {
      type: DataTypes.BOOLEAN,
      default: true,
      },

   

    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    rating : {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    released : {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    description : {
      type: DataTypes.TEXT ,
      allowNull : true,
    }



  });   
};
