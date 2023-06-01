const AccessTokenService = require('../services/token/access-token.service')
const { UnauthorizedError } = require('../lib/errors')
const { getUserById } = require('../dao/Users.DAO')
const {decode} = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      next(new UnauthorizedError('No auth token provided'))
      return
    }

    const token = authHeader.split(' ')
    const decoded = await AccessTokenService.verify(token[1])
    const user = await getUserById(parseInt(decoded.payload.userId))

    if (!user) {
      next(new UnauthorizedError('User not exists'))
      return
    }
    req.user = user
  } catch (e) {
    console.error(e)
    next(new UnauthorizedError())
  }

  next()
}


module.exports = auth;