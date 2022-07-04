-- for view employee function
SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ' ,m.last_name) AS Manager
FROM employee e 
LEFT JOIN employee m 
ON e.manager_id = m.id
JOIN role
ON e.role_id = role.id
JOIN department
ON role.department_id = department.id;

--for add employee function
SELECT employee.id, first_name, last_name, title, role.id FROM employee
JOIN role ON employee.role_id = role.id;
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?)

--for update employee function
SELECT employee.id, first_name, last_name, title, role.id 
FROM employee
JOIN role ON employee.role_id = role.id;

UPDATE employee SET role_id = ? WHERE id = ?

-- for view roles
SELECT role.id, role.title, department.name AS department, role.salary 
FROM role
JOIN department 
ON role.department_id = department.id;

--for add roles
SELECT id, name FROM department

INSERT INTO role (title, salary, department_id)
VALUES (?, ?, ?)

--for view departments
SELECT * FROM department

--for add departments
INSERT INTO department (name)
VALUES (?)