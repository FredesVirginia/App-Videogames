const { DataTypes} = require("sequelize");

module.exports = (sequelize) =>{
    sequelize.define("genres", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true
             },
      
        name: {
            type: DataTypes.STRING,
            allowNull: true,
          }
    });
}