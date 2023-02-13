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

//order by creation date, group by id
const getAllMapsDetails = () => {
  const query = `
  SELECT maps.*,
    CASE WHEN images.image_url IS NULL
    THEN $1
    ELSE images.image_url
    END as image_url
  FROM maps
  LEFT JOIN (
    SELECT DISTINCT map_id, image_url
    FROM points
    WHERE image_url <> $1) as images
      ON maps.id = images.map_id
  `;
  return db.query(query, [`'${DEFAULT_POINT_IMAGE_URL}'`])
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
};
