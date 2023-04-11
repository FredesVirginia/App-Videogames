const { DataTypes} = require("sequelize");

module.exports = (sequelize) =>{
    sequelize.define("platforms", {
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