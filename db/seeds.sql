
INSERT INTO department (name)
VALUES ('Development'), ('Sales'), ('HR'), ('Managers'), ('IT');

INSERT INTO roles (title, salary, department_id)
VALUES('Back End Dev', 80000, 1),('Front End Dev', 70000, 2),('Salesman', 50000, 3),('Manager', 120000, 4),('Human Resource', 45000, 5),('IT Tech', 50000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('David', 'Bowie', 1,1),('John', 'Hopkins', 2,2),('Mikhail', 'Khap', 3,3),('Mark', 'Wallace', 4,1),('Joe', 'Dickson', 5,2),('Bobby', 'Shmerd', 6,3);


