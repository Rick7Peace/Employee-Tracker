# Employee-Tracker
Table of Contents
-Description -Installation -Usage -Contributing -Test -Questions

# Description
Employee Tracker is a command-line application that helps businesses manage their employee database using Node.js, Inquirer, and PostgreSQL. The application allows users to view and manage departments, roles, and employees. This Content Management System (CMS) is designed to be user-friendly and provides features to add, update, view, and delete employee-related information.

# Installation
Clone the repository: git clone github.com/rvrutan/employee-tracker

Navigate to the project directory: cd employee-tracker

Install the required dependencies: npm install

Install the specific version of Inquirer: npm i inquirer@8.2.4

# Set up the PostgreSQL database by following these steps:

• Create a PostgreSQL database.

• Use the provided schema.sql file to create the necessary tables (department, role, employee).

• Optionally, use the seeds.sql file to pre-populate the database with sample data.

# Create a .env file in the root of your project to store your PostgreSQL credentials:

DB_USER=employees_db

DB_PASSWORD=""

DB_HOST=localhost

DB_PORT=5432


# Usage
Start the application by running the following command: npm start

You will be presented with a menu of options, allowing you to:

• View all departments

• View all roles

• View all employees

• View employees by manager

• View employees by department

• View total utilized budget of a department

• Add a department, role, or employee

• Update an employee’s role or manager

• Delete a department, role, or employee

Select the desired option using your arrow keys and follow the prompts to manage your employee database.

Here's an instructional video that you can watch: 

# Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch.
Commit your changes.
Submit a pull request.
Questions
Contact me for any further questions;

• Github: https://github.com/Rick7Peace

• Email: marmolejo.ricardo@gmail.com
