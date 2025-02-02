import inquirer from "inquirer";
import { pool, connectToDb } from "./connection.js";
connectToDb();
const db = pool;
// Start application
function startApp() {
    inquirer
        .prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: getMainMenuChoices(),
    })
        .then(handleMainMenuSelection);
}
// Handle main menu selection
function handleMainMenuSelection(answer) {
    const actionMap = {
        "View all departments": viewDepartments,
        "View all roles": viewRoles,
        "View all employees": viewEmployees,
        "Add a department": addDepartment,
        "Add a role": addRole,
        "Add an employee": addEmployee,
        "Update an employee role": updateEmployeeRole,
        "Update an employee manager": updateEmployeeManager,
        "View employees by manager": viewEmployeesByManager,
        "View employees by department": viewEmployeesByDepartment,
        "Delete a department": deleteDepartment,
        "Delete a role": deleteRole,
        "Delete an employee": deleteEmployee,
        "View department budget": viewDepartmentBudget,
        "Exit": () => db.end(),
    };
    actionMap[answer.action]();
}
// Get choices for the main menu
function getMainMenuChoices() {
    return [
        "View all departments",
        "View all roles",
        "View all employees",
        "View employees by department",
        "View employees by manager",
        "View department budget",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Update an employee manager",
        "Delete a department",
        "Delete a role",
        "Delete an employee",
        "Exit",
    ];
}
// Database queries
function queryDatabase(query, params = []) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res.rows);
            }
        });
    });
}
// View departments
async function viewDepartments() {
    try {
        const departments = await queryDatabase("SELECT * FROM department");
        console.table(departments);
    }
    catch (err) {
        console.error("Error fetching departments:", err);
    }
    startApp();
}
// View roles
async function viewRoles() {
    const query = `
    SELECT role.id, role.title, role.salary, department.name AS department 
    FROM role 
    JOIN department ON role.department_id = department.id`;
    try {
        const roles = await queryDatabase(query);
        console.table(roles);
    }
    catch (err) {
        console.error("Error fetching roles:", err);
    }
    startApp();
}
// View employees
async function viewEmployees() {
    const query = `
    SELECT 
      employee.id, 
      employee.first_name, 
      employee.last_name, 
      role.title, 
      department.name AS department, 
      role.salary, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    try {
        const employees = await queryDatabase(query);
        console.table(employees);
    }
    catch (err) {
        console.error("Error fetching employees:", err);
    }
    startApp();
}
// Add department
async function addDepartment() {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the name of the new department:",
        },
    ]);
    const query = `INSERT INTO department (name) VALUES ($1)`;
    try {
        await queryDatabase(query, [answers.name]);
        console.log(`Department "${answers.name}" added successfully!`);
    }
    catch (err) {
        console.error("Error adding department:", err);
    }
    startApp();
}
// Add role
async function addRole() {
    const departments = await queryDatabase("SELECT * FROM department");
    const departmentChoices = departments.map((department) => ({
        name: department.name,
        value: department.id,
    }));
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the role title:",
        },
        {
            type: "input",
            name: "salary",
            message: "Enter the role salary:",
        },
        {
            type: "list",
            name: "department_id",
            message: "Choose the department for this role:",
            choices: departmentChoices,
        },
    ]);
    const query = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`;
    try {
        await queryDatabase(query, [answers.title, answers.salary, answers.department_id]);
        console.log("Role added successfully!");
    }
    catch (err) {
        console.error("Error adding role:", err);
    }
    startApp();
}
// Add employee
async function addEmployee() {
    const roles = await queryDatabase("SELECT * FROM role");
    const employees = await queryDatabase("SELECT * FROM employee");
    const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
    }));
    const managerChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
    }));
    managerChoices.unshift({ name: "None", value: -1 });
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter the employee's first name:",
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter the employee's last name:",
        },
        {
            type: "list",
            name: "role_id",
            message: "Select the employee's role:",
            choices: roleChoices,
        },
        {
            type: "list",
            name: "manager_id",
            message: "Select the employee's manager:",
            choices: managerChoices,
        },
    ]);
    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
    try {
        await queryDatabase(query, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
        console.log("Employee added successfully!");
    }
    catch (err) {
        console.error("Error adding employee:", err);
    }
    startApp();
}
// Other CRUD functions would follow the same structure. For example:
async function updateEmployeeRole() {
    // Implement similar to addEmployee
}
async function updateEmployeeManager() {
    // Implement similar to addEmployee
}
async function viewEmployeesByManager() {
    // Implement view logic
}
async function viewEmployeesByDepartment() {
    // Implement view logic
}
async function deleteDepartment() {
    // Implement delete logic
}
async function deleteRole() {
    // Implement delete logic
}
async function deleteEmployee() {
    // Implement delete logic
}
async function viewDepartmentBudget() {
    const query = `
    SELECT 
      department.name AS department,
      SUM(role.salary) AS total_budget
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    GROUP BY department.name
  `;
    try {
        const budget = await queryDatabase(query);
        console.table(budget);
    }
    catch (err) {
        console.error("Error fetching department budgets:", err);
    }
    startApp();
}
startApp();
