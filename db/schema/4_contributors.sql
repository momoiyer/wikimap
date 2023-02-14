-- Drop and recreate contributors table
DROP TABLE IF EXISTS contributors CASCADE;
CREATE TABLE contributors (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE NOT NULL
  );
