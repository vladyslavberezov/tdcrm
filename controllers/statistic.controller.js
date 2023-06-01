const {handleError} = require('../lib/utils')
const {InternalServerError, ConflictError, ForbiddenError} = require('../lib/errors')
const {StatisticDAO} = require('../dao/')

const getAllStatistic = handleError(async (req, res) => {
  const data = await StatisticDAO.getAllStatistic(req)
  res.send({data})
})
const getMe = handleError(async (req, res) => {
  const data = await StatisticDAO.getMyStat(req)
  res.send({data})
})


module.exports = {
  getAllStatistic,
  getMe
}
