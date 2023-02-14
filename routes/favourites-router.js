const express = require('express');
const router = express.Router();

const userQueries = require(`../db/queries/user-queries`);
const contributorsQueries = require(`../db/queries/contributors-queries`);
const favouritesQueries = require(`../db/queries/favourites-queries`);

router.get('/', (req, res) => {
  const userId = req.session.userid;
  console.log("userId cookie", req.session.userid)
  favouritesQueries.getMapDetailsForFavouriteMapsByUserId(userId)
    .then(faveMaps => {
      res.json({ faveMaps});
      //returns an array of each map
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});



//havent tested because we need html on click, may need to use this in client side instead?
// adds mapid and user id to favourites
router.post('/:mapid', (req, res) => {
  const userId = req.session.userid;
  const mapId = req.params.mapid;
  favouritesQueries.addMapToFavouritesByUserId(userId, mapId)
    .then(addedRow => {
      res.sendStatus(201);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

})

//havent tested because we need html on click, may need to use this in client side instead?
// adds mapid and user id to favourites
router.delete('/:mapid', (req, res) => {
  const userId = req.session.userid;
  const mapId = req.params.mapid;
  favouritesQueries.removeMapFromFavouritesByUserId(userId, mapId)
    .then(deletedRow => {
      res.sendStatus(201);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

module.exports = router;
