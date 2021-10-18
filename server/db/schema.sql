/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
*/

DROP DATABASE IF EXISTS mentorUp;

CREATE DATABASE mentorUp;

USE mentorUp;

CREATE TABLE profiles (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
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
  from_id INT,
  to_id INT,
  body VARCHAR(1000),
  time DATETIME,
  PRIMARY KEY (ID)
);

CREATE TABLE bookings (
  id INT NOT NULL AUTO_INCREMENT,
  booked_by_student_id INT,
  availability_id INT,
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

ALTER TABLE messages ADD FOREIGN KEY (from_id) REFERENCES profiles (id);
ALTER TABLE messages ADD FOREIGN KEY (to_id) REFERENCES profiles (id);
ALTER TABLE ratings ADD FOREIGN KEY (mentor_id) REFERENCES profiles (id);
ALTER TABLE bookings ADD FOREIGN KEY (booked_by_student_id) REFERENCES profiles (id);
ALTER TABLE bookings ADD FOREIGN KEY (availability_id) REFERENCES availabilities (id);
ALTER TABLE availabilities ADD FOREIGN KEY (offering_id) REFERENCES offerings (id);
ALTER TABLE offerings ADD FOREIGN KEY (mentor_id) REFERENCES profiles (id);
