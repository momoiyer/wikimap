const db = require('../connection');
const { DEFAULT_POINT_IMAGE_URL } = require('../../constant.js');

const getFavouriteMapsByUserId = (userId) => {
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
