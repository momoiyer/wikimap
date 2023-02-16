const db = require('../connection');

const getUserProfileByUserId = (userId) => {

  return db.query(`SELECT * FROM users
  WHERE id = $1;`, [userId])
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      return console.err(err);
    });
};

const getMyMapDetailsByUserId = (userId) => {
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

const getUserNameByUserId = (userId) => {
  return db.query(`SELECT name FROM users
  WHERE id = $1;`, [userId])
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      return console.err(err);
    });

};

module.exports = {
  getUserNameByUserId,
  getUserProfileByUserId,
  getMyMapDetailsByUserId
};
