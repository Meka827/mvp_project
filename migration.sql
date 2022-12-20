DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS providers;
DROP TABLE IF EXISTS screens;


CREATE TABLE patients (
    id SERIAL NOT NULL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth date NOT NULL,
    username varCHar,
    password varCHar,
    email text,
    online boolean
);

CREATE TABLE providers (
    id SERIAL NOT NULL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name Text NOT NULL,
    username varCHar,
    password varCHar,
    email text,
    online boolean
);

CREATE TABLE screens (
    id SERIAL NOT NULL PRIMARY KEY,
    date date NOT NULL,
    patient_id INTEGER,
    height INTEGER,
    weight INTEGER,
    provider_id INT NOT NULL
);

-- ALTER TABLE screens
-- ADD FOREIGN KEY (patient_id) REFERENCES patients(id);
-- ALTER TABLE screens
-- ADD FOREIGN KEY (provider_id) REFERENCES providers(id);

INSERT INTO patients (first_name, last_name, date_of_birth, username, password, email, online) VALUES ('michelle', 'obama', '1969-12-23', 'michelle.obama', 'obama69', 'michelle.obama@metoo.com', false);
INSERT INTO providers (first_name, last_name, username, password, email, online) VALUES ('franklin', 'stein', 'monster31', 'ihatefire', 'themonster_man@metoo.com', false);
INSERT INTO screens (date, patient_id, height, weight, provider_id) VALUES ('2022-12-12', 1, 65, 150, 1);

-- CREATE TABLE providers (
--     id SERIAL,
-- );

-- INSERT INTO BMI (date, patient_id, bmi, lean) VALUES (2022-12-14, 1, 10);
-- INSERT INTO BMI (date, patient_id, bmi, lean) VALUES (2022-09-23, 2, 25);
