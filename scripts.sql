CREATE TABLE instructors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);

CREATE TABLE instructorAattendeddates (
  id SERIAL PRIMARY KEY,
  instructorid INT,
  checkdate DATE,
  FOREIGN KEY (instructorid) REFERENCES instructors(id)
);

CREATE TABLE checkIns (
  id SERIAL PRIMARY KEY,
  instructordateid INT,
  checkintime TIME,
  checkouttime TIME,
  FOREIGN KEY (instructordateid) REFERENCES instructorattendeddates(id)
);
