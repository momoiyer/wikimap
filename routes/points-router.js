const express = require('express');
const router = express.Router();
const pointQueries = require('../db/queries/points-queries');

router.get('/:mapid', (req, res) => {
  const mapId = req.params.mapid;
  pointQueries.getPointsDetailsByMapId(mapId)
    .then(results => {
      console.log("results:", results);
      return res.json({ results });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//change this to get body from req.body and userId from cookie
//check if map_id need to be passed from route or inside the object?
router.post('/new', (req, res) => {
  const body = req.body;
  pointQueries.addPoint(body)
    .then(point => {
      res.json({ point });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//change this to get body from req.body
router.post('/:pointId', (req, res) => {
  const pointId = req.params.pointId;
  const body = req.body;
  pointQueries.updatePoint(pointId, body)
    .then(point => {
      res.json({ point });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.delete('/:pointId', (req, res) => {
  const pointId = req.params.pointId;
  pointQueries.deletePoint(pointId)
    .then(point => {
      res.json({ point });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
