const db = require('../connection');
const { DEFAULT_POINT_IMAGE_URL } = require('../../constant.js');
const { user } = require('pg/lib/defaults');

// const getMaps = () => {
//   return db.query(`SELECT * FROM maps;`)
//     .then(data => {
//       return data.rows;
//     })
//     .catch(err => {
//       return err;
//     });
// };




const getContributedMapIdsAsArrayByUserId = (userId) => {
  return db.query(`SELECT maps.id FROM maps
  JOIN contributors ON maps.id = contributors.map_id
  WHERE contributors.user_id = $1
  ORDER BY maps.created_date DESC;`, [userId])
  .then(data => {
    const mapIds = data.rows.map( (element) => {
      return element.id;
    })
    return mapIds;
  })
  .catch(err => {
    return console.error(err);
  })
};



const getMapDetailsForContributedMapsByUserId = (userId) => {
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
    LEFT JOIN contributors ON maps.id = contributors.map_id
    WHERE contributors.user_id = $2
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

//for the manage contributors section on map details page
const removeContributorsFromMapByUserId = (userId, mapId) => {
  return db.query(`DELETE FROM contributors
  WHERE user_id = $1 AND map_id =$2
  RETURNING*;`, [userId, mapId])
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    return console.error(err);
  })
};

//get username by id function in user-queries file

//may need to first get userId by name, instead of by cookie based on form data
const addContributorsToMapByUserId = (userId, mapId) => {
  return db.query(`INSERT INTO contributors (user_id, map_id)
  VALUES ($1, $2)
  RETURNING*;`, [userId, mapId])
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    return console.error(err);
  })
};



const getUserIdByName = (userId) => {

}



const getContributorsByMapId = (mapId) => {
  return db.query(`SELECT users.name
  FROM contributors
  LEFT JOIN users ON users.id = contributors.user_id
  WHERE map_id = $1;`, [mapId])
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    return console.err(err);
  })
};

module.exports = {
  getContributedMapIdsAsArrayByUserId,
  addContributorsToMapByUserId,
  removeContributorsFromMapByUserId,
  getMapDetailsForContributedMapsByUserId,
  getContributorsByMapId
 };
