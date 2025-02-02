import inquirer from "inquirer";
import db from "./db.js";

// Defining the Action type (you should replace this with the actual type definition)
type Action = "View all departments" | "Add a department" | "Exit";

// Main application logic
async function startApp(): Promise<void> {
  try {
    // Prompt the user with available actions
    const { action } = await inquirer.prompt<{ action: Action }>({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments", // Action 1
        "Add a department",     // Action 2
        "Exit"                  // Action 3
      ],
    });

    // Handle the selected action
    await handleAction(action);
  } catch (err) {
    console.error("Error in the app flow:", err);
  }
}

// Function to handle user action
async function handleAction(action: Action): Promise<void> {
  switch (action) {
    case "View all departments":
      await viewDepartments();
      break;
    case "Add a department":
      await addDepartment(); // You can define this function similarly to the others
      break;
    case "Exit":
      await exitApp();
      break;
    default:
      console.error("Unknown action selected.");
      break;
  }
}

// Function to fetch and display departments
async function viewDepartments(): Promise<void> {
  try {
    const res = await db.query("SELECT * FROM department");
    console.table(res.rows);
  } catch (err) {
    console.error("Error fetching departments:", err);
  }
  // Prompt for the next action after viewing departments
  await startApp();
}

// Function to handle the exit process
async function exitApp(): Promise<void> {
  try {
    const { confirmExit } = await inquirer.prompt({
      type: "confirm",
      name: "confirmExit",
      message: "Are you sure you want to exit?",
    });

    if (confirmExit) {
      await db.end();
      console.log("Disconnected from the database");
      process.exit(0);
    } else {
      await startApp();  // Go back to main app if the user doesn't want to exit
    }
  } catch (err) {
    console.error("Error during exit confirmation:", err);
    await startApp();
  }
}

// Function to handle adding a department (empty for now, you can define it later)
async function addDepartment(): Promise<void> {
  // Placeholder for the add department logic
  console.log("Add department functionality will be implemented here.");
  await startApp();
}

// Start the application
startApp();
