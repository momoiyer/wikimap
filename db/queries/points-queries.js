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

const addPoint = (body) => {

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

const updatePoint = (pointId, body) => {
  let updateStatement = "";

  if (body.title) {
    updateStatement += `title = '${body.title}',`;
  }
  if (body.description) {
    updateStatement += `description = '${body.description}',`;
  }
  if (body.address_line_1) {
    updateStatement += `address_line_1 = '${body.address_line_1}',`;
  }
  if (body.address_line_2) {
    updateStatement += `address_line_2 = '${body.address_line_2}',`;
  }
  if (body.lat) {
    updateStatement += `lat = ${body.lat},`;
  }
  if (body.lon) {
    updateStatement += `lon = ${body.lon},`;
  }
  if (body.image_url) {
    updateStatement += `image_url = '${body.image_url}',`;
  }

  updateStatement = updateStatement.slice(0, -1);

  const query = `
  UPDATE points
  SET ${updateStatement}
  WHERE points.id = $1
  RETURNING *;
  `;

  return db.query(query, [pointId])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

const deletePoint = (pointId) => {
  const query = `
  DELETE FROM points WHERE points.id = $1;
  `;
  return db.query(query, [pointId])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

module.exports = {
  getPointsDetailsByMapId,
  addPoint,
  updatePoint,
  deletePoint,
};
