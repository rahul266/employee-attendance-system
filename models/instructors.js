const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('instructors', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'instructors',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "instructors_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
