var DataTypes = require("sequelize").DataTypes;
var _checkins = require("./checkins");
var _instructorattendeddates = require("./instructorattendeddates");
var _instructors = require("./instructors");

function initModels(sequelize) {
  var checkins = _checkins(sequelize, DataTypes);
  var instructorattendeddates = _instructorattendeddates(sequelize, DataTypes);
  var instructors = _instructors(sequelize, DataTypes);

  checkins.belongsTo(instructorattendeddates, { as: "instructordate", foreignKey: "instructordateid"});
  instructorattendeddates.hasMany(checkins, { as: "checkins", foreignKey: "instructordateid"});
  instructorattendeddates.belongsTo(instructors, { as: "instructor", foreignKey: "instructorid"});
  instructors.hasMany(instructorattendeddates, { as: "instructorattendeddates", foreignKey: "instructorid"});

  return {
    checkins,
    instructorattendeddates,
    instructors,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
