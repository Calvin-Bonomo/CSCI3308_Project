CREATE TABLE users
(
  username VARCHAR(50) PRIMARY KEY,
  password CHAR(60) NOT NULL,
  description VARCHAR(250),
  image_url CHAR(56)
);