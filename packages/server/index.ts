require("dotenv").config({ path: "../../.env" });

import express from "express"
import { setupSession } from "./src/setup";

function initialize(): void {
  const app = express();
  setupSession(app)
}

// const { PORT = 5000 } = process.env;


// app.use(express.static("./build"));

// app.get("/", (req, res) => {
//   res.send({ message: "server is working!" });
// })

// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`)
// })