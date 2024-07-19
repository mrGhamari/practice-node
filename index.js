const { log } = require("console");
const express = require("express");
const { json } = require("express/lib/response");
const app = express();
const port = 3000;
const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.use(express.json());

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({ status: "200", success: "Success", tours });
});

app.post("/api/v1/tours", (req, res) => {
  const newId = tours.length;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: 'Tour is Created'
      })
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
