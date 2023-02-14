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

const addPoints = (body) => {

  let columnName = "title, address_line_1, address_line_2, lat, lon, map_id,";
  let columnValue = `'${body.title}','${body.address_line_1}','${body.address_line_2}',${body.lat},${body.lon},${body.map_id},`;

  if (body.description) {
    columnName += "description,";
    columnValue += `'${body.description}',`;
  }
  if (body.image_url) {
    columnName += "image_url,";
    columnValue += `'${body.image_url}',`;
  }

  columnName = columnName.slice(0, -1);
  columnValue = columnValue.slice(0, -1);

  const query = `
  INSERT INTO points (${columnName})
  VALUES (${columnValue})
  RETURNING *;
  `;

  return db.query(query)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};


module.exports = {
  getPointsDetailsByMapId,
  addPoints,
};
