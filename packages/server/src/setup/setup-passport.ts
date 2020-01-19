import passport from 'passport'
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
  StrategyOptions,
} from 'passport-google-oauth20'
import Player from '../models/player'
import { googleCallbackUrl } from '../utils/url'

function extractPlayerFromGoogleProfile(profile: Profile) {
  return {
    username: profile.displayName,
    googleId: profile.id,
    googleDisplayName: profile.displayName,
    googleFamilyName: profile.name && profile.name.familyName,
    googleGivenName: profile.name && profile.name.givenName,
    googlePhotoUrl: profile.photos && profile.photos[0].value,
  }
}

export function setupPassport() {
  const config: StrategyOptions = {
    clientID: process.env.GOOGLE_LOGIN_CLIENT || '',
    clientSecret: process.env.GOOGLE_LOGIN_SECRET || '',
    callbackURL: googleCallbackUrl,
  }

  async function deserialize(googleId: string, done: VerifyCallback) {
    try {
      const player = await Player.findOne({ where: { googleId: googleId } })
      if (player) {
        return done(undefined, player.dataValues)
      } else {
        done(undefined, undefined)
      }
    } catch (e) {
      done(e, undefined)
    }
  }

  function serialize(user: any, done: VerifyCallback) {
    done(undefined, user.googleId)
  }

  async function userCallback(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    // if the player already exists, fetch their profile, otherwise create a new player
    try {
      const player = await Player.findOne({ where: { googleId: profile.id } })
      if (player) {
        return done(undefined, player.dataValues)
      } else {
        const newPlayer = extractPlayerFromGoogleProfile(profile)
        Player.create(newPlayer)
        return done(undefined, newPlayer)
      }
    } catch (e) {
      done(e)
    }
  }

  // setup passport configuration
  passport.use(new GoogleStrategy(config, userCallback))
  // this is called after the user logs in
  // stores the 'user.googleId' inside of the 'req.session'
  passport.serializeUser(serialize)
  // this takes the id from the cookie sent from the browser on each request
  // and then uses that to deserialize the user
  passport.deserializeUser(deserialize)
}
