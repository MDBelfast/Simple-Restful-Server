CREATE TABLE users (
    userId varchar(80),
    name varchar(80),
    password varchar(80),
    profession varchar(80),
    id int
);

INSERT INTO users (userId, name, password, profession, id) VALUES
('user1', 'mahesh', 'password1', 'teacher', 1),
('user2', 'suresh', 'password2', 'librarian', 2),
('user3', 'ramesh', 'password3', 'clerk', 3);
