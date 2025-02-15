-- Drop the database if it exists and create a new one
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- Switch to the new database
\c employees_db;

-- Create department table
CREATE TABLE department (
  dept_id SERIAL PRIMARY KEY,
  dept_name VARCHAR(50) NOT NULL UNIQUE
);

-- Create role table
CREATE TABLE role (
  role_id SERIAL PRIMARY KEY,
  role_title VARCHAR(50) NOT NULL UNIQUE,
  base_salary DECIMAL(10, 2) NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id) 
    REFERENCES department (dept_id) 
    ON DELETE CASCADE
);

-- Create employee table
CREATE TABLE employee (
  emp_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (role_id) 
    REFERENCES role (role_id),
  FOREIGN KEY (manager_id) 
    REFERENCES employee (emp_id) 
    ON DELETE CASCADE
);
