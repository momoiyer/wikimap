-- Drop and recreate points table
DROP TABLE IF EXISTS points CASCADE;
CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  address_line_1 VARCHAR(255) NOT NULL,
  address_line_2 VARCHAR(255) NOT NULL,
  lat DECIMAL NOT NULL,
  lon DECIMAL NOT NULL,
  image_url VARCHAR(355) DEFAULT 'https://cdn.pixabay.com/photo/2022/04/24/08/08/park-7153125__340.png',
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE NOT NULL
  );
