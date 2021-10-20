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
  offering_name VARCHAR(60),
  description VARCHAR(1000),
  mentor_id INT NOT NULL,
  PRIMARY KEY (ID)
);

ALTER TABLE messages ADD FOREIGN KEY (from_id) REFERENCES profiles (id);
ALTER TABLE messages ADD FOREIGN KEY (to_id) REFERENCES profiles (id);
ALTER TABLE auth ADD FOREIGN KEY (profile_id) REFERENCES profiles (id);
ALTER TABLE ratings ADD FOREIGN KEY (mentor_id) REFERENCES profiles (id);
ALTER TABLE bookings ADD FOREIGN KEY (booked_by_student_id) REFERENCES profiles (id);
ALTER TABLE bookings ADD FOREIGN KEY (availability_id) REFERENCES availabilities (id);
ALTER TABLE availabilities ADD FOREIGN KEY (offering_id) REFERENCES offerings (id);
ALTER TABLE offerings ADD FOREIGN KEY (mentor_id) REFERENCES profiles (id);

INSERT INTO profiles (id, name, photo, mentor) VALUES (1, "James Jones", "http://i.imgur.com/SETiE.png", false);
INSERT INTO profiles (id, name, photo, mentor) VALUES (2, "Lisa Simpson", "https://source.unsplash.com/dUtizJyby4E", true);
INSERT INTO profiles (id, name, photo, mentor) VALUES (3, "Homer Simpson", "https://source.unsplash.com/8PMvB4VyVXA", true);
INSERT INTO profiles (id, name, photo, mentor) VALUES (4, "Bart Simpson", "https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png", true);
INSERT INTO profiles (id, name, photo, mentor) VALUES (5, "Monet Myrtle", "https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png", true);
INSERT INTO profiles (id, name, photo, mentor) VALUES (6, "Louis Lee", "https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png", true);
INSERT INTO profiles (id, name, photo, mentor) VALUES (7, "Fanno Chea", "https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png", true);
INSERT INTO profiles (id, name, photo, mentor) VALUES (8, "Shrin Etezazian", "https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png", true);
INSERT INTO profiles (id, name, photo, mentor) VALUES (9, "Jason West", "https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png", true);
INSERT INTO profiles (id, name, photo, mentor) VALUES (10, "Lebron James", "https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png", true);

INSERT INTO offerings (id, offering_name, description, mentor_id) VALUES (1, "Morden and Contempory Art and Design", "Painting is fun. I will teach you to become Van Gogh!", 2);
INSERT INTO offerings (id, offering_name, description, mentor_id) VALUES (2, "Carpentry", "With over a decade experience in the field, I will teach you the craft of carpentry", 3);
INSERT INTO offerings (id, offering_name, description, mentor_id) VALUES (3, "Computer Science", "Entrpreneur, built thousands of apps", 4);
INSERT INTO offerings (id, offering_name, description, mentor_id) VALUES (4, "Morden and Contempory Art and Design", "As one of the best artist in the decade, I want to share my knowledge to next generation", 5);
INSERT INTO offerings (id, offering_name, description, mentor_id) VALUES (5, "Basketball", "Life long baskerball player, lost one ACL so I know how to protect yourself in the game", 6);
INSERT INTO offerings (id, offering_name, description, mentor_id) VALUES (6, "Computer Science", "Two times national hackerthon winner, future googler will teach you how to program correctly", 7);
INSERT INTO offerings (id, offering_name, description, mentor_id) VALUES (7, "Wind Surf", "This is just one of my hobby, join me and I will open your world of all kinds of outdoor activity", 8);
INSERT INTO offerings (id, offering_name, description, mentor_id) VALUES (8, "Game Design", "Build a game with me in 2 days! Tell me what would you like to play and let's do it", 9);
INSERT INTO offerings (id, offering_name, description, mentor_id) VALUES (9, "Basketball", "With over a decade experience in the field, I will teach you the craft of carpentry", 10);


INSERT INTO availabilities (id, start_time, end_time, offering_id) VALUES (1, "2021-10-31 01:15:00", "2021-10-31 02:15:00", 1);
INSERT INTO availabilities (id, start_time, end_time, offering_id) VALUES (2, "2021-10-31 04:15:00", "2021-10-31 05:15:00", 1);
INSERT INTO availabilities (id, start_time, end_time, offering_id) VALUES (3, "2021-10-31 02:15:00", "2021-10-31 03:15:00", 2);
INSERT INTO availabilities (id, start_time, end_time, offering_id) VALUES (4, "2021-10-31 01:15:00", "2021-10-31 02:15:00", 2);

INSERT INTO bookings (id, booked_by_student_id, availability_id) VALUES (1, 1, 1);
INSERT INTO bookings (id, booked_by_student_id, availability_id) VALUES (2, 1, 3);
INSERT INTO bookings (id, booked_by_student_id, availability_id) VALUES (3, 4, 2);

INSERT INTO ratings (id, mentor_id, rating) VALUES (1, 2, 4.99);
INSERT INTO ratings (id, mentor_id, rating) VALUES (2, 3, 4.99);
INSERT INTO ratings (id, mentor_id, rating) VALUES (3, 4, 4.99);
INSERT INTO ratings (id, mentor_id, rating) VALUES (4, 5, 4.99);
INSERT INTO ratings (id, mentor_id, rating) VALUES (5, 6, 4.99);
INSERT INTO ratings (id, mentor_id, rating) VALUES (6, 7, 4.99);
INSERT INTO ratings (id, mentor_id, rating) VALUES (7, 8, 4.99);
INSERT INTO ratings (id, mentor_id, rating) VALUES (8, 9, 4.99);
INSERT INTO ratings (id, mentor_id, rating) VALUES (9, 10, 4.99);



