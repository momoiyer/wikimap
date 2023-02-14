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

//for userpage carousel, and my favourites page

const getMapDetailsForFavouriteMapsByUserId = (userId) => {
  return db.query( `
  SELECT maps.*, users.name as onwer_name,
    CASE WHEN images.image_url IS NULL
    THEN $1
    ELSE images.image_url
    END as image_url,
    CASE WHEN favouriteMaps.map_id IS NULL
    THEN FALSE
    ELSE TRUE END as isFavourite
  FROM maps
  JOIN users ON users.id = maps.owner_id
  LEFT JOIN (
    SELECT DISTINCT map_id, image_url
    FROM points
    WHERE image_url <> $1) as images
      ON maps.id = images.map_id
  LEFT JOIN (
    SELECT map_id
    FROM favourites
    WHERE user_id = $2) as favouriteMaps
      ON maps.id = favouriteMaps.map_id
  WHERE maps.id IN (
    SELECT maps.id FROM maps
    LEFT JOIN favourites ON maps.id = favourites.map_id
    WHERE favourites.user_id = $2
  )
  AND maps.delete_status = FALSE
  ORDER BY created_date;
  `, [DEFAULT_POINT_IMAGE_URL, userId])
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    return console.error(err);
  })
};

//for click handler post route
const removeMapFromFavouritesByUserId = (userId, mapId) => {
  return db.query(`DELETE FROM favourites
  WHERE user_id = $1 AND map_id =$2
  RETURNING*;`, [userId, mapId])
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    return console.err(err);
  })
};

//for click handler post route
const addMapToFavouritesByUserId = (userId, mapId) => {
  return db.query(`INSERT INTO favourites (user_id, map_id)
  VALUES ($1, $2)
  RETURNING*;`, [userId, mapId])
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
  addMapToFavouritesByUserId,
};
