import express from "express"

const { PORT = 5000 } = process.env;

const app = express();

app.use(express.static("./build"));

app.get("/", (req, res) => {
  res.send({ message: "server is working!" });
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})