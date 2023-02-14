const express = require('express');
const router = express.Router();

const userQueries = require(`../db/queries/user-queries`);
const contributorsQueries = require(`../db/queries/contributors-queries`);
const favouritesQueries = require(`../db/queries/favourites-queries`);

router.get('/', (req, res) => {
  const userId = req.session.userid;
  //console.log("userId cookie", req.session.userid)
  contributorsQueries.getContributedMapsB (userId)
    .then(sharedMaps => {
      res.json({ sharedMaps });
      //returns an array of each map
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:mapid', (req, res) => {
  const userId = req.session.userid;
  const mapId = req.params.mapid;

  contributorsQueries.getContributedMapsByUserId(mapId)
    .then(listOfContributors => {
      res.json({ listOfContributors });
      //returns an array of each map
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
