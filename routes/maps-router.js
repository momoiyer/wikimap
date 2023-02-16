/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/maps
 */

const express = require('express');
const router = express.Router();
const mapQueries = require('../db/queries/maps-queries');
const pointQueries = require('../db/queries/points-queries');

router.get('/all', (req, res) => {
  const userId = req.session.userid;
  let queryFunction = userId ? mapQueries.getAllMapsDetailsByUserId() : mapQueries.getAllMapsDetails();
  queryFunction
    .then(maps => {
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/mymaps', (req, res) => {
  const userId = req.session.userid;
  mapQueries.getMyMaps(userId)
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

router.get('/:mapid', (req, res) => {
  const mapId = req.params.mapid;
  const userId = req.session.userid;
  const mapPromise = userId ? mapQueries.getMapDetailsByMapIdNUserId(mapId, userId) : mapQueries.getMapDetailsByMapId(mapId);
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

//change this to get body from req.body and userId from cookie
router.post('/new', (req, res) => {
  const body = req.body;
  // const body = { title: 'New MAP Title', description: 'New MAP Description' };
  mapQueries.addMap(10, body)
    .then(map => {
      res.json({ map });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/:mapid/delete', (req, res) => {
  const mapId = req.params.mapid;
  mapQueries.deleteMap(mapId)
    .then(map => {
      res.json({ map });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//change this to get body from req.body
router.post('/:mapid', (req, res) => {
  const mapId = req.params.mapid;
  // const updateBody = req.body;
  const body = { title: 'Edited Title', description: 'Edited Description' };
  mapQueries.updateMap(mapId, body)
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
