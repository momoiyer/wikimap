const express = require('express');
const router = express.Router();
const pointQueries = require('../db/queries/points-queries');


//change this to get body from req.body and userId from cookie
router.post('/new', (req, res) => {
  const pointId = req.params.pointId;
  const body = {
    title: "New Hike",
    // description: "New Hike Description",
    address_line_1: "Line 1",
    address_line_2: "Line 2",
    lat: 50.96329262987205,
    lon: -115.13735273275209,
    map_id: 3,
    // image_url: 'https://cdn.pixabay.com/photo/2016/06/11/05/20/maligne-lake-1449489_1280.jpg'
  };
  pointQueries.addPoints(pointId, body)
    .then(map => {
      res.json({ map });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
