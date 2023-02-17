const db = require('../connection');

//get point detail data by mapId for map detail page of any type of user
const getPointsDetailsByMapId = (mapId) => {
  const query = `
    SELECT points.*
    FROM points
    WHERE map_id = $1
    ORDER BY last_modified DESC;
  `;
  return db.query(query, [mapId])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

//Add new point
const addPoint = (body) => {

  let columnName = "title, address_line_1, address_line_2, lat, lon, map_id,";

  const columnValue = [body.title, body.address_line_1, body.address_line_2, body.lat, body.lon, body.map_id];
  let columnValuePlaceHolder = '';


  if (body.description) {
    columnName += "description,";
    columnValue.push(body.description);
  }
  if (body.image_url) {
    columnName += "image_url,";
    columnValue.push(body.image_url);
  }

  columnName = columnName.slice(0, -1);

  columnValue.map((val, index) => columnValuePlaceHolder += `$${index + 1},`);
  columnValuePlaceHolder = columnValuePlaceHolder.slice(0, -1);

  const query = `
  INSERT INTO points (${columnName})
  VALUES (${columnValuePlaceHolder})
  RETURNING *;
  `;

  return db.query(query, columnValue)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

//Update point with user provided value
const updatePoint = (pointId, body) => {
  let updateStatement = "last_modified = NOW(), ";
  const updateValue = [pointId];

  let i = 2;

  if (body.title) {
    updateStatement += `title = $${i},`;
    updateValue.push(body.title);
    i++;
  }
  if (body.description) {
    updateStatement += `description = $${i},`;
    updateValue.push(body.description);
    i++;
  }
  if (body.address_line_1) {
    updateStatement += `address_line_1 = $${i},`;
    updateValue.push(body.address_line_1);
    i++;
  }
  if (body.address_line_2) {
    updateStatement += `address_line_2 = $${i},`;
    updateValue.push(body.address_line_2);
    i++;
  }
  if (body.lat) {
    updateStatement += `lat = $${i},`;
    updateValue.push(body.lat);
    i++;
  }
  if (body.lon) {
    updateStatement += `lon = $${i},`;
    updateValue.push(body.lon);
    i++;
  }
  if (body.image_url) {
    updateStatement += `image_url = $${i},`;
    updateValue.push(body.image_url);
  }

  updateStatement = updateStatement.slice(0, -1);

  const query = `
  UPDATE points
  SET ${updateStatement}
  WHERE points.id = $1
  RETURNING *;
  `;

  return db.query(query, updateValue)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

//Delete point from point table
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
