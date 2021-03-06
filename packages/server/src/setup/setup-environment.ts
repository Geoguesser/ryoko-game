import path from 'path'
require('dotenv').config({ path: path.join(__dirname, '../../../.env') })

export function checkEnvironmentVariables() {
  const { DATABASE_URI, GOOGLE_LOGIN_CLIENT, GOOGLE_LOGIN_SECRET } = process.env
  console.log('DATABASE:', DATABASE_URI)
  if (!DATABASE_URI) {
    throw new Error('Please make sure the DATABASE_URI environment variable is set correctly...')
  }
  if (!GOOGLE_LOGIN_CLIENT) {
    throw new Error(
      'Please make sure the GOOGLE_LOGIN_CLIENT environment variable is set correctly...'
    )
  }
  if (!GOOGLE_LOGIN_SECRET) {
    throw new Error(
      'Please make sure the GOOGLE_LOGIN_SECRET environment variable is set correctly...'
    )
  }
}
