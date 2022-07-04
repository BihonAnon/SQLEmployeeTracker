--data for department table
INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal");
--data for role table
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1),
       (2, "Salesperson", 80000, 1),
       (3, "Senior Engineer", 150000, 2),
       (4, "Junior Engineer", 120000, 2),
       (5, "Senior Accountant", 160000, 3),
       (6, "Junior Accountant", 125000, 3),
       (7, "Lead Lawyer", 250000, 4),
       (8, "Lawyer", 190000, 4);
--data for employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 1, 5),
       (2, "Adam", "Cruz", 2, 1),
       (3, "Chris", "Deng", 3, NULL),
       (4, "Bryan", "Swarthout", 4, 3),
       (5, "Michael", "McEwen", 5, NULL),
       (6, "Sammi", "Moore", 6, 5),
       (7, "Night", "Wing", 7, 8),
       (8, "Bat", "Man", 8, NULL);