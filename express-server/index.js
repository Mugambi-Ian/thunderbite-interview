const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors());
app.get("/runRandom", (req, res) => {
  const x = 360;
  const y = 1080;
  let deg = (Math.floor(Math.random() * (x + y)) + x) * 45;
  let secs = Math.floor(Math.random() * 5) + 2;
  res.send({ deg, secs });
});

app.listen(port, () => {
  console.log(`Express Server listening at http://localhost:${port}`);
});
