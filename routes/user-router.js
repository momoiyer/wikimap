const express = require('express');
const router = express.Router();



const userQueries = require(`../db/queries/user-queries`);
const contributorsQueries = require(`../db/queries/contributors-queries`);
const favouritesQueries = require(`../db/queries/favourites-queries`);

router.get(`/login/:userid`, (req, res) => {

  // console.log('req.params.userid:', req.params.userid)

  //sets cookie to user id value
  //and we can use the cookie to look up info from database

  req.session.userid = req.params.userid

  res.json(req.session.userid);
});

router.get('/', (req, res) => {
  const userId = req.session.userid;

  userQueries.getUserProfileByUserId(userId)
    .then(userInfo => {
      res.json({ userInfo});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});



module.exports = router;

