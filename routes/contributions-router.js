const express = require('express');
const router = express.Router();

const userQueries = require(`../db/queries/user-queries`);
const contributorsQueries = require(`../db/queries/contributors-queries`);

//show maps and details for all of the users contributed maps
router.get('/', (req, res) => {
  const userId = req.session.userid;
  //console.log("userId cookie", req.session.userid)
  contributorsQueries.getMapDetailsForContributedMapsByUserId(userId)
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

//shows list of contributors for a specific map for manage contributions section
router.get('/:mapid', (req, res) => {
  const userId = req.session.userid;
  const mapId = req.params.mapid;

  contributorsQueries.getContributorsByMapId(mapId)
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

//may need to first get userId by name, instead of by cookie based on form data
//built query function for userid by name

//adds user id and map id to contributions table
router.post('/', (req, res) => {
  const body = req.body;
  console.log("body : ", body);

  const { mapId, userName } = body;

  userQueries.getUserByName(userName)
    .then(users => {
      const userId = users.id;
      return contributorsQueries.addContributorsToMapByUserId(userId, mapId);
    })
    .then(addedRow => {
      res.json({ addedRow });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.delete('/:mapid/:userid', (req, res) => {
  // const userId = req.session.userid;
  const userId = req.params.userid;
  const mapId = req.params.mapid;

  contributorsQueries.removeContributorsFromMapByUserId(userId, mapId)
    .then(deletedRow => {
      res.json({ deletedRow });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

module.exports = router;
