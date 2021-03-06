import passport from 'passport'
import path from 'path'
import Strategy from 'passport-github2'
import dotenv from 'dotenv'

import User from '../models/user'
import init from './init'

const GitHubStrategy = Strategy.Strategy

dotenv.config({ path: path.join(__dirname, '../../.env') })

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRECT,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
  const { displayName, username, id } = profile
  const searchQuery = {
    githubId: id,
  }

  const updates = {
    displayName,
    githubId: id,
    username,
  }

  const options = {
    upsert: true,
  }

  // update the user if s/he exists or add a new user
  User.findOneAndUpdate(searchQuery, updates, options, (err, user) => {
    if (err) {
      return done(err)
    }

    return done(null, user)
  })
}))

// serialize user into the session
init()


export default passport
