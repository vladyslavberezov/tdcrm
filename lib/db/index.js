const path = require('path')
const {Sequelize, DataTypes} = require('sequelize')
const env = require('../env')
const {MODELS} = require('./types')
const {all} = require('express/lib/application')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER_ENTRY,
  env.DB_PASSWORD,
  {
    host: env.HOST,
    port: env.DB_PORT,
    dialect: env.DIALECT,
    timezone: '+00:00',
  },
)

const db = {}

async function initModels() {
  // importing all models to the db constant
  Object.values(MODELS).forEach((model) => {
    const defineModel = require(path.join(process.cwd(), 'models', `${model}.js`))
    db[model] = defineModel(sequelize, DataTypes)
  })

  // calling association function for models
  Object.values(MODELS).forEach((model) => {
    if (db[model].associate) {
      db[model].associate(db)
    }
  })
}

async function initDb() {
  await sequelize.authenticate()
  await initModels()
  await sequelize.sync()

  //this manual addition only for convenient testing
  await db.Statistic.destroy({
    where: {}
  })
  await db.User.destroy({
    where: {}
  })
  const admin = new db.User({
    nickname: 'admin',
    email: 'admin@admin.admin',
    userRole: 'admin',
    password: await bcrypt.hash('admin', 8)
  })
  await admin.save()
  const lead = new db.User({
    nickname: 'lead1',
    email: 'lead1@admin.admin',
    userRole: 'teamlead',
    password: await bcrypt.hash('lead1', 8)
  })
  await lead.save()
  const buyer = new db.User({
    nickname: 'buyer',
    email: 'buyer@admin.admin',
    userRole: 'buyer',
    leadId: lead.id,
    password: await bcrypt.hash('buyer', 8)
  })
  await buyer.save()
  const buyer2 = new db.User({
    nickname: 'buyer2',
    email: 'buyer2@admin.admin',
    userRole: 'buyer',
    leadId: lead.id,
    password: await bcrypt.hash('buyer2', 8)
  })
  await buyer2.save()

  const buyerstat = new db.Statistic({
    userId: buyer.id,
    click: 2,
  })
  await buyerstat.save()
  const buyerstat2 = new db.Statistic({
    userId: buyer2.id,
    click: 3,
  })
  await buyerstat2.save()
  const statlead = new db.Statistic({
    userId: lead.id,
    click: 1489,
  })
  await statlead.save()
  const adminStats = new db.Statistic({
    userId: admin.id,
    click: 229,
  })
  await adminStats.save()
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>end
}

module.exports = {
  sequelize,
  initDb,
  db,
  MODELS,
}

