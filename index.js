const inquirer = require("inquirer");
const db = require('./db/connection');
const cTable = require('console.table');
const {
    response
} = require("express");
const Connection = require("mysql/lib/Connection");

db.connect(() => {
    menu()
})

function menu() {
    inquirer.prompt(
            [{
                name: 'options',
                type: 'list',
                message: 'Choose what you would like to view.',
                choices: [
                    'view all departments',
                    'view all roles',
                    'view all employees',
                    'add a department',
                    'add a role',
                    'add an employee',
                    'update an employee role',
                    'EXIT'
                ]
            }]
        )
        .then(response => {
            if (response.options === 'view all departments') {
                viewDepartment();
            } else if (response.options === 'view all roles') {
                viewRoles();
            } else if (response.options === 'view all employees') {
                viewEmployees();
            } else if (response.options === 'add a department') {
                addDepartment();
            } else if (response.options === 'add a role') {
                addRole();
            } else if (response.options === 'add an employee') {
                addEmployee();
            } else if (response.options === 'add an employee') {
                updateEmployee();
            } else if (response.options === 'EXIT') {
                exitapp();
            }
        })
}

function viewDepartment() {
    db.query('select * from department', (err, data) => {
        console.table(data);
        menu();
    })
}

function viewRoles() {
    db.query('select * from roles', (err, data) => {
        console.table(data);
        menu();
    })
}

function viewEmployees() {
    db.query('select * from employee', (err, data) => {
        console.table(data);
        menu();
    })
}

function addDepartment() {
    inquirer.prompt([{
            type: "input",
            message: "What is the name of this department?",
            name: "departmentName"
        }])


        .then(response => {
            db.query('insert into department (name) values (?)', [response.departmentName], (err, data) => {
                viewDepartment();
            })
        })
}

function addRole() {
    inquirer.prompt([{
                type: 'input',
                message: 'What is this role called?',
                name: "title"
            },
            {
                type: 'input',
                message: 'What is the salary',
                name: "salary"
            },
            {
                type: 'input',
                message: 'What is the department ID',
                name: "departmentID"
            }
        ])


        .then(response => {
            db.query('insert into roles (title, salary, department_id) values (?,?,?)', [response.title, response.salary, response.departmentID], (err, data) => {
                viewRoles();
            })
        })
}

function addEmployee() {
    inquirer.prompt([{
                type: "input",
                message: "What is their first name?",
                name: "firstname"
            },
            {
                type: "input",
                message: "What is their last name?",
                name: "lastname"
            },
            {
                type: "input",
                message: "what is the employees role id",
                name: "roleid"
            },
            {
                type: "input",
                message: "Please enter the corresponding manager id or none if the employee has no manager",
                name: "managerid"
            }
        ])
        .then(response => {
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
                [response.firstname, response.lastname, response.roleid, response.managerid], (err, data) => {
                    viewEmployees()
                })
        })
}

function updateEmployee() {
    inquirer.prompt([{
                type: "input",
                message: "Please select the employee corresponding to the desired update",
                name: "id"
            },
            {
                type: "input",
                message: "Select a role for this",
                name: "newrole"
            }
        ])
        .then(response => {
            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`,
                [response.newrole, response.id], (err, data) => {
                    viewEmployees()
                })
        })
}

function exitapp() {
    process.exit();
}