USE Employee_System;

INSERT INTO department (department_name)
VALUES ("art"),
       ("administration"),
       ("developement"),
       ("training");

INSERT INTO roles (role_title, salary, department)
VALUES ("office assistant", 45000, 2),
       ("graphic designer", 50000, 1),
       ("ui/ux consultant", 60000, 1),
       ("trainer", 70000, 4),
       ("senior sde", 100000, 3);

INSERT INTO manager (first_name, last_name )
VALUES ("butler", "gerard"),
       ("eli", "jones"),
       ("chris", "pi2nes"),
       ("black", "widow"),
       ("lucifer", "morningstar");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("elliot", "smith", 1, 1),
       ("amira", "afzal", 1, 2),
       ("christoper", "lee", 2, 3),
       ("verónica", "rodriguez", 2, 3),
       ("igor", "stein", 4, 4),
       ("alexis", "bizowski", 3, 3),
       ("lottie", "daae", 4, 5);