CREATE DATABASE wheel;

USE wheel;


CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(24) NOT NULL
);

CREATE TABLE sessions (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
hash VARCHAR(64),
user_id INT NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE federated_credentials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  provider VARCHAR(200) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/db/schema.sql
 *  to create the database and the tables. */
