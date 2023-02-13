const db = require('../connection');

//get point detail data by mapId for map detail page of any type of user
const getPointsDetailsByMapId = (mapId) => {
  const query = `
    SELECT points.*
    FROM points
    WHERE map_id = $1;
  `;
  return db.query(query, [mapId])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};


module.exports = {
  getPointsDetailsByMapId,
};
