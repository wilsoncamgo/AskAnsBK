CREATE TABLE users(
    id VARCHAR(30) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE questions(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(30) NOT NULL UNIQUE,
    question VARCHAR(500) NOT NULL,
    date_sumb DATE NOT NULL,
    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

CREATE TABLE answers(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(30) NOT NULL UNIQUE,
    answer VARCHAR(500) NOT NULL,
    date_sumb DATE NOT NULL,
    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

INSERT INTO users (id,name)
VALUES (1000948840, 'Wilson Andres');

