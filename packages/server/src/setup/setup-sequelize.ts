import { Sequelize, Error } from 'sequelize'

export const sequelize = new Sequelize(process.env.DATABASE_URI || '', {
  dialectOptions: {
    ssl: true,
  },
})

export function setupSequelize(): void {
  sequelize.authenticate().catch((err: Error) => {
    throw new Error(`Error connecting to heroku postgres database ${err.message}`)
  })
}
