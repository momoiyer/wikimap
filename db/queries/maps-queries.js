const db = require('../connection');
const { DEFAULT_POINT_IMAGE_URL } = require('../../constant.js');
const { query } = require('express');

const getMaps = () => {
  return db.query(`SELECT * FROM maps;`)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

//get map display data for home page of non-logged in user
const getAllMapsDetails = () => {
  const query = `
  SELECT maps.id,title,description,to_char(created_date, 'dd-Mon-yyyy') as created_date ,delete_status,owner_id, users.name as onwer_name,
    CASE WHEN images.image_url IS NULL
    THEN $1
    ELSE images.image_url
    END as image_url
  FROM maps
  JOIN users ON users.id = maps.owner_id
  LEFT JOIN (
    SELECT DISTINCT ON(map_id)
     map_id, image_url
    FROM points
    WHERE image_url <> $1) as images
    ON maps.id = images.map_id
  WHERE delete_status = FALSE
  ORDER BY created_date;
  `;
  const param = [`${DEFAULT_POINT_IMAGE_URL}`];

  return db.query(query, param)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

//get map display data for home page of logged in user
const getAllMapsDetailsByUserId = (userId) => {
  const query = `
  SELECT maps.id,title,description,to_char(created_date, 'dd-Mon-yyyy') as created_date ,delete_status,owner_id, users.name as onwer_name,
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
    SELECT DISTINCT ON(map_id)
     map_id, image_url
    FROM points
    WHERE image_url <> $1) as images
      ON maps.id = images.map_id
  LEFT JOIN (
    SELECT map_id
    FROM favourites
    WHERE user_id = $2) as favouriteMaps
      ON maps.id = favouriteMaps.map_id
  WHERE delete_status = FALSE
  ORDER BY created_date;
  `;

  const param = [`${DEFAULT_POINT_IMAGE_URL}`, userId];

  return db.query(query, param)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

//get map detail data by mapId for map detail page of non-logged in user
const getMapDetailsByMapId = (mapId) => {
  const query = `
    SELECT maps.id,title,description,to_char(created_date, 'dd-Mon-yyyy') as created_date ,delete_status,owner_id, users.name as onwer_name
    FROM maps
    JOIN users
      ON users.id = maps.owner_id
    WHERE maps.id = $1
  `;
  return db.query(query, [mapId])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

//get map detail data by mapId for map detail page of logged in user
const getMapDetailsByMapIdNUserId = (mapId, userId) => {
  const query = `
    SELECT maps.id,title,description,to_char(created_date, 'dd-Mon-yyyy') as created_date ,delete_status,owner_id, users.name as onwer_name,
      CASE WHEN favouriteMaps.map_id IS NULL
      THEN FALSE
      ELSE TRUE END as isFavourite
    FROM maps
    JOIN users
      ON users.id = maps.owner_id
    LEFT JOIN (
    SELECT map_id
    FROM favourites
    WHERE user_id = $2) as favouriteMaps
      ON maps.id = favouriteMaps.map_id
    WHERE maps.id = $1
  `;
  return db.query(query, [mapId, userId])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

//get all maps owned by logged in user for My Maps page
const getMyMaps = (userId) => {
  const query = `
  SELECT maps.id,title,description,to_char(created_date, 'dd-Mon-yyyy') as created_date ,delete_status,owner_id, users.name as onwer_name,
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
    SELECT  DISTINCT ON(map_id)
    map_id, image_url
    FROM points
    WHERE image_url <> $1) as images
      ON maps.id = images.map_id
  LEFT JOIN (
    SELECT map_id
    FROM favourites
    WHERE user_id = $2) as favouriteMaps
      ON maps.id = favouriteMaps.map_id
  WHERE owner_id = $2 AND delete_status = FALSE
  ORDER BY created_date;
  `;

  const param = [`${DEFAULT_POINT_IMAGE_URL}`, userId];

  return db.query(query, param)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

//update map with user provided values
const updateMap = (mapId, body) => {
  let updateStatement = "";
  const updateValue = [mapId];

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

  updateStatement = updateStatement.slice(0, -1);

  const query = `
  UPDATE maps
  SET ${updateStatement}
  WHERE maps.id = $1
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

//add new map
const addMap = (userId, body) => {
  const query = `
  INSERT INTO maps
  ( title, description, owner_id)
  VALUES
  ($1,$2,$3)
  RETURNING *;
  `;

  const param = [body.title, body.description, userId];

  return db.query(query, param)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

//delete map (update delete_status)
const deleteMap = (mapId) => {
  const query = `
  UPDATE maps
  SET delete_status = TRUE
  WHERE maps.id = $1
  RETURNING *;
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
  getMaps,
  getAllMapsDetails,
  getAllMapsDetailsByUserId,
  getMapDetailsByMapId,
  getMapDetailsByMapIdNUserId,
  getMyMaps,
  updateMap,
  addMap,
  deleteMap,
};
