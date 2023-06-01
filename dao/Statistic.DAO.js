const {ConflictError, InternalServerError, ForbiddenError, UnauthorizedError} = require('../lib/errors')
const {sequelize, db} = require('../lib/db')
const {Op} = require('sequelize')
const {HttpError} = require('http-errors')


async function getAllStatistic(req) {
  // const {startDate, endDate} = req.body //if need search statistic between data
  switch (req.user.userRole) {
    case 'admin':
      console.log('admin')
      return await db.Statistic.findAll(
        //   {
        //   where: {
        //     [Op.between]: [startDate, endDate],
        //   }
        // }
      )
    case 'teamlead':
      console.log('teamlead')
      return await db.Statistic.findAll({
        include: {
          model: db.User,
        },
        where: {
          leadId: req.user.leadId,
        }
      })
    case 'buyer':
      return new UnauthorizedError()
    case 'user':
      return new UnauthorizedError()
  }
}

async function getMyStat(req) {
  switch (req.user.userRole) {
    case 'teamlead':
      return await db.Statistic.findAll({
        include: {
          model: db.User,
        },
        where: {
          userId: req.user.userId,
        }
      })
    case 'buyer':
      return await db.Statistic.findAll({
          where: {
            userId: req.user.userId
          }
        }
      )
    case 'user':
      return new UnauthorizedError()
  }
}


module.exports = {
  getAllStatistic,
  getMyStat
}
