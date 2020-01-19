import express from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";

export function setupSession(app: express.Application): void {
  const isProduction = process.env.NODE_ENV === "production"

  // connect postgres session table to our express session
  const pgSession = connectPg(session);

  // express-session configuration object
  const config: session.SessionOptions = {
    secret:  process.env.SESSION_SECRET || "",
    store: new pgSession({
      conObject: {
        connectionString: process.env.DATABASE_URI,
        ssl: true,
      }
    }),
    resave: false,
    cookie: { secure: isProduction },
    saveUninitialized: true,
  }

  if (isProduction) {
    // needed because heroku runs on a proxy
    // otherwise cookie won't be set
    app.set("trust proxy", 1)
  }

  app.use(session(config))
}