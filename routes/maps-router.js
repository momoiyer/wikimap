/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/maps
 */

const express = require('express');
const router = express.Router();
const mapQueries = require('../db/queries/maps-queries');
const pointQueries = require('../db/queries/points-queries');

//change this to get user id from session later and merge with /all route
router.get('/all/:userId', (req, res) => {
  mapQueries.getAllMapsByUserId(req.params.userId)
    .then(maps => {
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/all', (req, res) => {
  mapQueries.getAllMaps()
    .then(maps => {
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:mapid/edit', (req, res) => {
  const mapId = req.params.mapid;
  mapQueries.getMapDetailsByMapId(mapId)
    .then(results => {
      res.json({ results });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


//change this to get user id from session later and merge with /all route
router.get('/:mapid/:userId', (req, res) => {
  const mapId = req.params.mapid;
  const userId = req.params.userId;
  const mapPromise = mapQueries.getMapDetailsByMapIdNUserId(mapId, userId);
  const pointPromise = pointQueries.getPointsDetailsByMapId(mapId);
  Promise.all([mapPromise, pointPromise])
    .then(results => {
      res.json({ results });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:mapid', (req, res) => {
  const mapId = req.params.mapid;
  const mapPromise = mapQueries.getMapDetailsByMapId(mapId);
  const pointPromise = pointQueries.getPointsDetailsByMapId(mapId);
  Promise.all([mapPromise, pointPromise])
    .then(results => {
      res.json({ results });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/', (req, res) => {
  mapQueries.getMaps()
    .then(maps => {
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;
