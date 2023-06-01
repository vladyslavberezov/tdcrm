const { MODELS } = require('../lib/db/')

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    MODELS.Statistic,
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      click: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      // anotherEfficiencyEnhancer: {
      //   type: DataTypes.INTEGER,
      // },
    },
    {
      tableName: 'Statistic',
      timestamps: true,
    },
  )
  model.associate = function (models) {
    models.Statistic.belongsTo(models.User,{foreignKey: 'userId'})
  }
  return model
}
