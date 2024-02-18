const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('checkins', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    instructordateid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'instructorattendeddates',
        key: 'id'
      }
    },
    checkintime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    checkouttime: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'checkins',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "checkins_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
