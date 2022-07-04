//Import and require mysql2
const mysql = require('mysql2')
//Import and require inquirer
const inquirer = require("inquirer")
//Import and require asciiart
const logo = require('asciiart-logo');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Password',
    database: 'employment_db'
  },
  console.log(`Connected to the employment_db database.`)
);

//create logo
const init = () => {
  //Initial text box that appears 
  console.log(
    logo({
      name: 'Employee Tracker',
      borderColor: 'grey',
      logoColor: 'bold-white',
    })
      .render()
  );

  //initial questions
  const startingQuestion = () => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'What would you like to do?',
          choices: ["View All Employees", "Add Employees", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
        },
      ])
      //switch case for each list option
      .then(answer => {
        switch (answer.choice) {
          case "View All Employees":
            viewEmployee()
            break;

          case "Add Employees":
            addEmployee()
            break;

          case "Update Employee Role":
            updateEmployee()
            break;

          case "View All Roles":
            viewRoles()
            break;

          case "Add Role":
            addRoles()
            break;

          case "View All Departments":
            viewDepartments()
            break;

          case "Add Department":
            addDepartments()
            break;

          case "Quit":
            finishPrompt()
            break;
        }
      });

    //---------View Functions--------
    //view employees
    function viewEmployee() {
      const sql = `
        SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ' ,m.last_name) AS Manager
        FROM employee e 
        LEFT JOIN employee m 
        ON e.manager_id = m.id
        JOIN role
        ON e.role_id = role.id
        JOIN department
        ON role.department_id = department.id;
        `;//sql prompt
      db.query(sql, (err, rows) => {//query
        if (err) {
          console.log(err);
        } else {
          console.log("\n")
          console.table(rows)
        }
        console.log("\n")
        startingQuestion();//return to inital q's
      });
    }
    //view departments
    function viewDepartments() {
      const sql = `SELECT * FROM department`;//sql prompt
      db.query(sql, (err, rows) => {//query
        if (err) {
          console.log(err);
        } else {
          console.table(rows)
        }
        startingQuestion();//back to inital q's
      });
    }
    //view roles
    function viewRoles() {
      const sql =
        `SELECT role.id, role.title, department.name AS department, role.salary 
        FROM role
        JOIN department 
        ON role.department_id = department.id;`;//SQL Query
      db.query(sql, (err, rows) => {// Queury dat
        if (err) {
          console.log(err);
        } else {
          console.table(rows)
        }
        startingQuestion();//back to inital Q
      });

    }

    //---------Add Functions---------
    //add employee
    function addEmployee() {
      const sql = `
        SELECT employee.id, first_name, last_name, title, role.id FROM employee
        JOIN role ON employee.role_id = role.id; `;//SQL prompt
      const sql2 = `
        SELECT id, title
        FROM role;`; //SQL prompt #2
      //array wizardry for inquirer prompt
      let roleChoices = []
      let roleChoicesId = []
      let managerChoices = []
      let managerChoicesId = []

      db.query(sql, (err, rows) => {//Query dat 
        if (err) {
          console.log(err);
          return;
        }
        managerChoices = rows
        managerChoicesId = managerChoices.map(element => {//mapping for inquirer
          return {
            name: `${element.first_name} ${element.last_name}`,
            value: element.id
          }
        })
        managerChoicesId.unshift({ name: "none", value: null });
        db.query(sql2, (err, rows) => {
          if (err) {
            console.log(err);
            return;
          }

          roleChoices = rows
          roleChoicesId = roleChoices.map(element => {//mapping for inquirer
            return {
              name: element.title,
              value: element.id
            }
          })
          inquirer //Inquirer for annoying "list role choices" and "manager choices"
            .prompt([
              {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?",
              },
              {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?",
              },
              {
                type: 'list',
                name: 'roleChoice',
                message: "What is the employee's role?",
                choices: roleChoicesId
              },
              {
                type: 'list',
                name: 'managerChoice',
                message: "Who is the employee's manager?",
                choices: managerChoicesId
              },
            ])
            .then(answers => {
              const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
              VALUES (?, ?, ?, ?)`; // Insert Prompt
              const params = [answers.firstName, answers.lastName, answers.roleChoice, answers.managerChoice];

              db.query(sql, params, (err, result) => {
                if (err) {
                  console.log(err);
                  return;
                }

                startingQuestion()// back to start
              })
            });
        });
      });
    }
    //add role
    function addRoles() {
      const sql = `SELECT id, name FROM department `; //Select department choices for mappin
      let departmentChoices = []
      let departmentChoicesId = []

      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
          return;
        }
        departmentChoices = rows
        departmentChoicesId = departmentChoices.map(element => {//map department for inquirer
          return { name: element.name, value: element.id }
        })
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'roleName',
              message: 'What is the name of the role?',
            },
            {
              type: 'input',
              name: 'salary',
              message: 'What is the salary of the role?',
            }, {
              type: 'list',
              name: 'departmentChoice',
              message: 'Which department does the role belong to?',
              choices: departmentChoicesId
            },
          ])
          .then(answers => {
            const sql = `INSERT INTO role (title, salary, department_id)
                VALUES (?, ?, ?)`;//SQL Insert role
            const params = [answers.roleName, answers.salary, answers.departmentChoice];

            db.query(sql, params, (err, result) => {//Query that Insert
              if (err) {
                console.log(err);
                return;
              }

              startingQuestion()//Back to inital q
            })
          });
      });
    };
    //add department
    function addDepartments() {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?',
          },
        ])
        .then(answers => {
          const sql = `INSERT INTO department (name)
              VALUES (?)`; // Insert new department 
          const params = [answers.departmentName];


          db.query(sql, params, (err, result) => {//query dat
            if (err) {
              console.log(err);
              return;
            }

            startingQuestion()//back to start
          })
        });
    };

    //----------Update Function--------
    //update employees
    function updateEmployee() {

      const sql = `
          SELECT employee.id, first_name, last_name, title, role.id 
          FROM employee
          JOIN role ON employee.role_id = role.id;`; // Select N Join for futher manipulation
      //Arrays
      let roleChoices = []
      let roleChoicesId = []
      let employeeChoices = []
      let employeeChoicesId = []
      db.query(sql, (err, rows) => {//Query dat
        if (err) {
          console.log(err);
          return;
        }
        employeeChoices = rows
        employeeChoicesId = employeeChoices.map(element => {//mappin
          return {
            name: `${element.first_name} ${element.last_name}`,
            value: element.id
          }
        })
        roleChoices = rows
        roleChoicesId = roleChoices.map(element => {//more mappin
          return {
            name: element.title,
            value: element.id
          }
        })
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'employeeName',
              message: "Which employee's role do you want to update?",
              choices: employeeChoicesId,
            },
            {
              type: 'list',
              name: 'roleChoice',
              message: "Which role do you want to assign the selected employee?",
              choices: roleChoicesId,
            },
          ])
          .then(answers => {
            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`; //update SQL prompt
            const params = [answers.roleChoice, answers.employeeName];
            db.query(sql, params, (err, result) => {//query it
              if (err) {
                console.log(err);
                return;
              }
              startingQuestion()//back to inital q's
            })
          });
      });
    }



  }

  //quit function
  function finishPrompt() {
    console.log("You have successfully closed this application! I hope you have a great day!");
    process.exit();

  }

  startingQuestion();
}

init()