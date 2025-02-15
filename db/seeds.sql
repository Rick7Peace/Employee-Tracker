-- Insert data into the departments table
INSERT INTO department (dept_name)
VALUES 
    ('Sales'),
    ('Marketing'),
    ('Engineering'),
    ('Human Resources');

-- Insert data into the job_roles table
INSERT INTO role (role_title, base_salary, department_id)
VALUES 
    ('Sales Manager', 70000.00, 1),  -- Sales department
    ('Marketing Manager', 75000.00, 2),  -- Marketing department
    ('Software Engineer', 90000.00, 3),  -- Engineering department
    ('HR Specialist', 60000.00, 4);  -- HR department

-- Insert data into the employees table
-- Note: manager_id references emp_id from the same table

-- Employee 1: John Doe, Sales Manager (no manager)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, NULL),  -- John has no manager (top-level manager)
    ('Alice', 'Smith', 2, NULL),  -- Alice has no manager (top-level manager)
    ('Bob', 'Johnson', 3, 1),  -- Bob's manager is John Doe
    ('Sarah', 'Lee', 4, 2),  -- Sarah's manager is Alice Smith
    ('Mike', 'Brown', 3, 1),  -- Mike's manager is John Doe
    ('Rachel', 'Green', 3, 2),  -- Rachel's manager is Alice Smith
    ('Tom', 'White', 4, 4);  -- Tom's manager is Sarah Lee
