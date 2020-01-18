export const clientUrl = process.env.NODE_ENV === "production" ? "https://www.ryoko.gg" : "http://localhost:3000"

export const googleCallbackUrl = process.env.NODE_ENV === "production" ? "https://ryoko-dev.herokuapp.com/auth/google/redirect" : "http://localhost:5000/auth/google/redirect"