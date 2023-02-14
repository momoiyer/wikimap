const db = require('../connection');
const { DEFAULT_POINT_IMAGE_URL } = require('../../constant.js');

const getFavouriteMapIdsAsArrayByUserId = (userId) => {

  return db.query(`SELECT * FROM maps
    JOIN favourites ON maps.id = favourites.map_id
    WHERE favourites.user_id = $1
    ORDER BY maps.created_date DESC;`, [userId])
  .then(data => {
    const mapIds = data.rows.map( (element) => {
      return element.id;
    })
    return mapIds;
  })
  .catch(err => {
    return console.err(err);
  })
};

//for userpage carousel
const getMapDetailsForFavouriteMapsByUserId = (userId) => {
  return db.query()
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    return console.err(err);
  })
};

const removeMapFromFavouritesByUserId = (userId, mapId) => {
  return db.query()
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    return console.err(err);
  })
};

const addMapToFavouritesByUserId = (userId, mapId) => {
  return db.query()
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    return console.err(err);
  })
};

module.exports = {
  getFavouriteMapIdsAsArrayByUserId,
  getMapDetailsForFavouriteMapsByUserId,
  removeMapFromFavouritesByUserId,
  addMapToFavouritesByUserId
};
