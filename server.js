//require the clients
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');
const  {selectEmployee, addEmployee, addRole,addDepartment, firstOptions, selectEmployeeConfirm, updateEmployeeRole} = require('./Assets/js/index')

//sets max events to limitless
require('events').EventEmitter.defaultMaxListeners = 0

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

//middleware 
app.use(express.urlencoded({extended: false})); 
app.use(express.json());

// create the connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
    // port: process.env.PORT || 3001
  }, console.log('Connected successfully to database')
  );


const startOver = async ()=>{
    let confirm = ()=>{
      return inquirer.prompt(
        {
            type: 'confirm',
            message: 'Would you like to go back to the Main Menu? ',
            name: 'startOver',
        });}
    var results = await confirm()

        if (results.startOver === true){
            console.log(results)
            init()
        }else if (results.startOver === false){
            console.log(results)
            console.log(`Thank you for using Chel's Employee Management System. Goodbye!`)
            db.end();
        }

    // console.log(results) 
  }

async function init() {

    db.connect();

    var sql = '';
    var params = [];

    var results = await firstOptions();

    // console.log(results);

    if(results.initPrompt == 'View all departments'){
        console.log('You chose to view all departments!');
        sql = 'SELECT * FROM department'
        db.query(sql, (err, results)=>{
            if(err){
                console.log(`Sorry, we couldn't complete your request`)
            }else if (!results){
                console.log('Sorry, there are no Deparments!')
            }else {
                console.table('Department Table', results);
                startOver();}});
    }else if(results.initPrompt == 'View all roles'){
        console.log('Viewing all roles');
        sql = 'SELECT * FROM roles'
        db.query(sql, (err, results)=>{
            if(err){
                console.log(`Sorry, we couldn't complete your request`)
            }else if (!results){
                console.log('Sorry, there are no roles!')
            }else {
                console.table('Role Table', results);
                startOver();}});
    }else if(results.initPrompt == 'View all employees'){
        console.log('Viewing all employees');
        sql = 'SELECT * FROM employee'
        db.query(sql, (err, results)=>{
            if(err){
                console.log(`Sorry, we couldn't complete your request`)
            }else if (!results){
                console.log('Sorry, there are no employees!')
            }else {
                console.table('Employee Table', results);
                startOver();}});
    }else if(results.initPrompt == 'Add a department'){
        console.log('Adding a department!');
        let newDepartmentName = await addDepartment();
        sql = `INSERT INTO department (department_name) VALUES (?)`
        params = [newDepartmentName.departmentName.toLowerCase()];
        db.query(sql, params, (err, results)=>{
            if(err){
                console.log(`Sorry, we couldn't complete your request`)
                console.log(results)
                console.log(err);
            }else {
                console.log(`Sucsessfully Added "${newDepartmentName.departmentName}"  to your departments!`);
                startOver();}});
    }else if(results.initPrompt == 'Add a role'){
        console.log('Adding a role!');
        var newRole = await addRole();
        // console.log(newRole);
        sql = `INSERT INTO roles (role_title, salary, department) VALUES ('${newRole.roleTitle.toLowerCase()}', ${newRole.roleSalary}, ${newRole.roleDepartment})`
        db.query(sql, (err, results)=>{
            if(err){
                console.log(`Sorry, we couldn't complete your request`)
                console.log(results)
                console.log(err);
            }else {
                console.log(`Successfully Added "${newRole.roleTitle}"  to your roles!`)
                startOver();}});
    }else if (results.initPrompt == 'Add an employee'){
        console.log('Adding an employee!')
        var newEmployee = await addEmployee();

        sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${newEmployee.employeeFirstName.toLowerCase()}', '${newEmployee.employeeLastName.toLowerCase()}', ${newEmployee.employeeRole}, ${newEmployee.employeeManager})`

        db.query(sql, (err, results)=>{
            if(err){
                console.log(`Sorry, we couldn't complete your request`)
                console.log(results)
                console.log(err);
            }else {
                console.log(`Successfully Added "${newEmployee.employeeFirstName} ${newEmployee.employeeLastName}"  to your Employees!`);
                startOver();}});
    }else if(results.initPrompt == 'Update an employee role'){
        console.log('Updating an employee!');


        async function updateSequence (){
            var chooseEmployee = await selectEmployee();

            db.query(`SELECT * FROM employee WHERE id = ${chooseEmployee.employeeID}`, (err, results)=>{
                if(err){
                    console.log(`Sorry, we couldn't complete your request`)
                }else if (!results){
                    console.log('Sorry, there are no employees with that ID!')
                }else{
                    console.table('Employee Table', results);
                }
            });

            var confirmEmployee = await selectEmployeeConfirm();

            if(confirmEmployee.confirmEmployee === true){
                var updatedRole = await updateEmployeeRole();

                db.query(`UPDATE employee SET role_id = ${updatedRole.newEmployeeRole} WHERE id = ${chooseEmployee.employeeID}`, (err, results)=>{
                    if(err){
                        console.log(`Sorry, that didn't work!`)
                        console.log(err);
                    }else if(!results){
                        console.log('Could not find the employee! Sorry.')
                    }else{
                        console.log('Successfully updated employee!')
                        startOver();
                    }
                })

            }else if(confirmEmployee.confirmEmployee === false){
                console.log('Okay, please try again!')
                updateSequence();
            }else{
                console.log('Sorry, we cannot complete your request!')
            }};
            updateSequence();
    }else{
        console.log(`Please choose ONE option, don't be greedy.`)
        init()
    } 
}
// app.listen(PORT, ()=>{
//     console.log( `App listening on port ${PORT}`)
// })


init();






















//choose view departments => department names and ID's

//choose view roles => job title, role id, the department that role belongs to, and the salary for that role

//choose all employees =>  employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

//choose add department => prompted to enter the name of the department

//choose add a role => name, salary, and department for the role

//choose to add an employee => enter the employee’s first name, last name, role, and manager

//choose to update an employee role => select an employee to update and their new role and this information is updated in the database 