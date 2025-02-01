-- Insert data into the departments table
INSERT INTO departments (dept_name)
VALUES 
    ('Sales'),
    ('Marketing'),
    ('Engineering'),
    ('Human Resources');

-- Insert data into the job_roles table
INSERT INTO job_roles (role_title, base_salary, department_id)
VALUES 
    ('Sales Manager', 70000.00, 1),  -- Sales department
    ('Marketing Manager', 75000.00, 2),  -- Marketing department
    ('Software Engineer', 90000.00, 3),  -- Engineering department
    ('HR Specialist', 60000.00, 4);  -- HR department

-- Insert data into the employees table
-- Note: manager_id references emp_id from the same table

-- Employee 1: John Doe, Sales Manager (no manager)
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, NULL);  -- John has no manager (top-level manager)

-- Employee 2: Alice Smith, Marketing Manager (no manager)
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('Alice', 'Smith', 2, NULL);  -- Alice has no manager (top-level manager)

-- Employee 3: Bob Johnson, Software Engineer, managed by John Doe (Sales Manager)
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('Bob', 'Johnson', 3, 1);  -- Bob's manager is John Doe

-- Employee 4: Sarah Lee, HR Specialist, managed by Alice Smith (Marketing Manager)
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('Sarah', 'Lee', 4, 2);  -- Sarah's manager is Alice Smith

-- Employee 5: Mike Brown, Software Engineer, managed by John Doe (Sales Manager)
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('Mike', 'Brown', 3, 1);  -- Mike's manager is John Doe

-- Employee 6: Rachel Green, Software Engineer, managed by Alice Smith (Marketing Manager)
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('Rachel', 'Green', 3, 2);  -- Rachel's manager is Alice Smith

-- Employee 7: Tom White, HR Specialist, managed by Sarah Lee (HR Specialist)
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('Tom', 'White', 4, 4);  -- Tom's manager is Sarah Lee
