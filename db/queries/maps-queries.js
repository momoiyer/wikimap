const db = require('../connection');
const { DEFAULT_POINT_IMAGE_URL } = require('../../constant.js');


// console.log("default: ", DEFAULT_POINT_IMAGE_URL);

const getMaps = () => {
  return db.query(`SELECT * FROM maps;`)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

//get map data for home page of non-logged in user
const getAllMapsDetails = () => {
  const query = `
  SELECT maps.*, users.name as onwer_name,
    CASE WHEN images.image_url IS NULL
    THEN $1
    ELSE images.image_url
    END as image_url
  FROM maps
  JOIN users ON users.id = maps.owner_id
  LEFT JOIN (
    SELECT DISTINCT map_id, image_url
    FROM points
    WHERE image_url <> $1) as images
      ON maps.id = images.map_id
  ORDER BY created_date;
  `;
  return db.query(query, [`'${DEFAULT_POINT_IMAGE_URL}'`])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

//get map data for home page of logged in user
const getAllMapsDetailsByUserId = (userId) => {
  const query = `
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
  ORDER BY created_date;
  `;
  return db.query(query, [`'${DEFAULT_POINT_IMAGE_URL}'`, userId])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

module.exports = {
  getMaps,
  getAllMapsDetails,
  getAllMapsDetailsByUserId
};
