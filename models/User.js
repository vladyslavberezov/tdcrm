const { MODELS } = require('../lib/db')
module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    MODELS.User,
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      userRole: { type: DataTypes.ENUM('admin', 'teamlead', 'buyer', 'user'), defaultValue: 'user'},
      nickname: { type: DataTypes.STRING, unique: true },
      leadId: { type: DataTypes.INTEGER },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING },
    },
    {
      tableName: 'Users',
      timestamps: true,
    },
  )

  model.associate = function (models) {
    models.User.hasMany(models.Statistic, { foreignKey: 'userId' })
    models.User.hasOne(models.User, { foreignKey: 'leadId' })

  }
  return model
}
