/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
*/

DROP DATABASE IF EXISTS mentorUp;

CREATE DATABASE mentorUp;

USE mentorUp;

CREATE TABLE profiles (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  password VARCHAR(60) NOT NULL,
  photo VARCHAR(255) NOT NULL,
  mentor boolean,
  PRIMARY KEY (ID)
);

CREATE TABLE ratings (
  id INT NOT NULL AUTO_INCREMENT,
  mentor_id INT,
  rating DECIMAL(3, 2),
  PRIMARY KEY (ID)
);

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  message_from_id INT,
  message_to_id INT,
  message_body VARCHAR(1000),
  message_time DATETIME,
  PRIMARY KEY (ID)
);

CREATE TABLE schedules (
  id INT NOT NULL AUTO_INCREMENT,
  apptime DATETIME,
  offering_id INT,
  mentor_id INT,
  PRIMARY KEY (ID)
);

CREATE TABLE offerings (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(60),
  description VARCHAR(1000),
  PRIMARY KEY (ID)
);

ALTER TABLE schedules ADD FOREIGN KEY (offering_id) REFERENCES offerings (id);
ALTER TABLE schedules ADD FOREIGN KEY (mentor_id) REFERENCES profiles (id);
ALTER TABLE messages ADD FOREIGN KEY (message_from_id) REFERENCES profiles (id);
ALTER TABLE messages ADD FOREIGN KEY (message_to_id) REFERENCES profiles (id);
ALTER TABLE ratings ADD FOREIGN KEY (profile_id) REFERENCES profiles (id);
