//require the client
// const mysql = require('mysql2');
const inquirer = require('inquirer');
const { initial } = require('lodash');


  const firstOptions = () => {
    return inquirer.prompt(
        {
            type: 'checkbox',
            message: "Welcome to your Employee Management System. Please choose an option: ",
            name: 'initPrompt',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        });
  };

const addDepartment = ()=>{
    return inquirer.prompt(
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'departmentName',
        });    
}

const addRole = ()=>{
        return inquirer.prompt([
            {
                type: 'input',
                message: 'What is the title of the role?',
                name: 'roleTitle',
             },
             {
                type: 'number',
                message: 'What is the department ID that the role is in?',
                name: 'roleDepartment',
             },
             {
                type: 'number',
                message: 'How much is the role Salary?',
                name: 'roleSalary',
             }
    ]);    
}

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'employeeFirstName',
         },
         {
            type: 'input',
            message: 'What is the lastname of the employee?',
            name: 'employeeLastName',
         },
         {
            type: 'number',
            message: 'What is the employees role ID?',
            name: 'employeeRole',
         },
         {
            type: 'number',
            message: 'What is the manager ID for this employee?',
            name: 'employeeManager',
         }
    ]); 
}

const selectEmployee = ()=>{
    return inquirer.prompt(
        {
            type: 'number',
            message: 'What is the ID of the employee you would like to update?',
            name: 'employeeID',
        }); 
}
const selectEmployeeConfirm = ()=>{
    return inquirer.prompt(
        {
            type: 'confirm',
            message: 'Is this the employee you would like to update?',
            name: 'confirmEmployee',
        }); 
}
const updateEmployeeRole= ()=>{
    return inquirer.prompt(
        {
            type: 'number',
            message: 'What is the new role ID for this employee?',
            name: 'newEmployeeRole',
         }); 
}


module.exports = {selectEmployee, addEmployee, addRole,addDepartment, firstOptions, selectEmployeeConfirm, updateEmployeeRole}