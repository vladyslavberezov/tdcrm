const ms = require('ms')
const JwtService = require('./jwt-service')
const env = require('../../lib/env')

class AccessTokenService extends JwtService {
  constructor() {
    super({
      secret: env.ACCESS_TOKEN_SECRET
    })
  }

  async generate(payload) {
    const token = await this.sign(payload, env.ACCESS_TOKEN_EXPIRES)

    const expiresInMs = parseInt(env.ACCESS_TOKEN_EXPIRES_MS)
    const expiresAt = new Date(Date.now() + expiresInMs)
    return {token, expiresAt}
  }

  verify(token) {
    return this.verify(token, this.secret, {ignoreExpiration: true}  )
  }
}

module.exports = new AccessTokenService()
