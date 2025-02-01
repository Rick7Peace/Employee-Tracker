-- Purpose: This file contains the SQL query to retrieve the employee information.
SELECT 
    e.id AS employee_id,
    e.first_name AS employee_first_name,
    e.last_name AS employee_last_name,
    CONCAT(m.first_name, ' ', m.last_name) AS manager_full_name,
    r.title AS role_title,
    r.salary AS role_salary,
    d.name AS department_name
FROM 
    employees e
    -- Join with the managers table to retrieve manager information
LEFT JOIN 
    employees m ON e.manager_id = m.id
    -- Join with the roles table to retrieve role information
JOIN 
    roles r ON e.role_id = r.id
    -- Join with the departments table to retrieve department information
JOIN 
    departments d ON r.department_id = d.id
-- Add additional conditions as needed, such as filtering by department, role, etc.
ORDER BY 
    e.id;
