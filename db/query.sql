-- Purpose: This file contains the SQL query to retrieve the employee information.
SELECT 
    e.emp_id AS employee_id, 
    e.first_name AS employee_first_name,
    e.last_name AS employee_last_name,
    CONCAT(m.first_name, ' ', m.last_name) AS manager_full_name,
    r.role_title AS role_title,
    r.base_salary AS role_salary,
    d.dept_name AS department_name
FROM 
    employees e
    -- Left join with the employees table to retrieve manager information
LEFT JOIN 
    employees m ON e.manager_id = m.emp_id
    -- Join with the job_roles table to retrieve role information
JOIN 
    job_roles r ON e.role_id = r.role_id
    -- Join with the departments table to retrieve department information
JOIN 
    departments d ON r.department_id = d.dept_id
-- Add additional conditions as needed, such as filtering by department, role, etc.
ORDER BY 
    e.emp_id;
