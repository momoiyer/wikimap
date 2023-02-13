const db = require('../connection');

const getUserProfileByUserId = (userId) => {

  return db.query(`SELECT * FROM users
  WHERE id = $1;`,[userId])
  .then(data => {
    return data.rows[0];
  })
  .catch(err => {
    return console.err(err);
  })
};

module.exports = { getUserProfileByUserId };
