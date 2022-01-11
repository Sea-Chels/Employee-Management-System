-- setting up the tables in the database, as well as making the database itself. 
DROP DATABASE IF EXISTS Employee_System;
CREATE DATABASE Employee_System;

USE Employee_System;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL 
  );

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
role_title VARCHAR(30),
salary INT,
department INT,
FOREIGN KEY (department)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE manager (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT, 
    manager_id INT,
    FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
        REFERENCES manager(id)
        ON DELETE SET NULL
);