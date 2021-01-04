CREATE TABLE users(
    id VARCHAR(30) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE topics(
    id SERIAL PRIMARY KEY,
    topic VARCHAR(50) NOT NULL
);

CREATE TABLE questions(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(30) NOT NULL UNIQUE,
    topic_id INT NOT NULL,
    question VARCHAR(500) NOT NULL,
    date_sumb DATE NOT NULL,
    FOREIGN KEY (topic_id)
        REFERENCES topics(id)
        ON UPDATE RESTRICT,
    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

CREATE TABLE answers(
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    user_id VARCHAR(30) NOT NULL UNIQUE,
    answer VARCHAR(500) NOT NULL,
    date_sumb DATE NOT NULL,
    FOREIGN KEY(question_id)
        REFERENCES questions(id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);



INSERT INTO users (id,name)
VALUES (1000948840, 'Wilson Andres');

