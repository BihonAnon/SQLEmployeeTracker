INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal");
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Head Sales", 100000, 1),
       (2, "Salesperson", 80000, 1),
       (3, "S Engineer", 150000, 2),
       (4, "J Engineer", 120000, 2),
       (5, "S Accountant", 160000, 3),
       (6, "J Accountant", 125000, 3),
       (7, "Head Lawyer", 250000, 4),
       (8, "Lawyer", 190000, 4);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 1, 5),
       (2, "Adam", "Cruz", 2, 1),
       (3, "Byron", "Dalberg", 3, NULL),
       (4, "Bryan", "Swarthout", 4, 3),
       (5, "Michael", "McEwen", 5, NULL),
       (6, "Sammi", "Moore", 6, 5),
       (7, "Night", "Wing", 7, 8),
       (8, "Bat", "Man", 8, NULL);