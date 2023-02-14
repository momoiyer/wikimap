const db = require('../connection');
const { DEFAULT_POINT_IMAGE_URL } = require('../../constant.js');

// const getMaps = () => {
//   return db.query(`SELECT * FROM maps;`)
//     .then(data => {
//       return data.rows;
//     })
//     .catch(err => {
//       return err;
//     });
// };


//might want to change to data value to mapid
//so we can use the answer to populate map details?

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
    return console.err(err);
  })
};

//for manage contributors section
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

const getMapDetailsForContributedMapsByUserId = (userId) => {
  return db.query()
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    return console.err(err);
  })
};

//for the manage contributors section on map details page
const removeContributorsFromMapByUserId = (userId, mapId) => {
  return db.query()
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    return console.err(err);
  })
};

const addContributorsToMapByUserId = (userId, mapId) => {
  return db.query()
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
