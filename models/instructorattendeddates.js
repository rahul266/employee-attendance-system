const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('instructorattendeddates', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    instructorid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'instructors',
        key: 'id'
      }
    },
    checkdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'instructorattendeddates',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "instructorattendeddates_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
