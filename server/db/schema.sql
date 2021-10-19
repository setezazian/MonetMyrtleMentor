/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
*/

DROP DATABASE IF EXISTS mentorUp;

CREATE DATABASE mentorUp;

USE mentorUp;

CREATE TABLE auth (
  id INT NOT NULL AUTO_INCREMENT,
  profile_id INT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  salt VARCHAR(255) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE profiles (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  photo VARCHAR(255) NOT NULL,
  mentor boolean NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE ratings (
  id INT NOT NULL AUTO_INCREMENT,
  mentor_id INT NOT NULL,
  rating DECIMAL(3, 2),
  PRIMARY KEY (ID)
);

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  from_id INT NOT NULL,
  to_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  time DATETIME NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE bookings (
  id INT NOT NULL AUTO_INCREMENT,
  booked_by_student_id INT NOT NULL,
  availability_id INT NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE availabilities (
  id INT NOT NULL AUTO_INCREMENT,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  offering_id INT NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE offerings (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(60),
  description VARCHAR(1000),
  mentor_id INT NOT NULL,
  PRIMARY KEY (ID)
);

ALTER TABLE bookings ADD FOREIGN KEY (offering_id) REFERENCES offerings (id);
ALTER TABLE bookings ADD FOREIGN KEY (mentor_id) REFERENCES profiles (id);
ALTER TABLE messages ADD FOREIGN KEY (from_id) REFERENCES profiles (id);
ALTER TABLE messages ADD FOREIGN KEY (to_id) REFERENCES profiles (id);
ALTER TABLE ratings ADD FOREIGN KEY (profile_id) REFERENCES profiles (id);
ALTER TABLE auth ADD FOREIGN KEY (profile_id) REFERENCES profiles (id);
