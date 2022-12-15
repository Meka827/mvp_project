DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS BMI;


CREATE TABLE patients (
    id SERIAL,
    name TEXT,
    DOB date,
    height_in int,
    weight_lbs int
);

INSERT INTO patients (name, DOB, height_in, weight_lbs) VALUES ('Ryan Reynolds', '1976-10-23', 74, 190);
INSERT INTO patients (name, DOB, height_in, weight_lbs) VALUES ('Blake Lively', '1987-08-25', 70, 140);

-- {
--     id: 6,
--     name: 'Tom Hardy',
--     dob: 1977-09-15T00:00:00.000Z,
--     height_in: 79,
--     weight_lbs: 200
--   }


-- CREATE TABLE BMI (
--     id SERIAL,
--     date date,
--     patient_id int,
--     bmi int,
--     PRIMARY KEY (id),
--     FOREIGN KEY (patient_id) REFERENCES patients(id)
-- );

-- INSERT INTO BMI (date, patient_id, bmi, lean) VALUES (2022-12-14, 1, 10);
-- INSERT INTO BMI (date, patient_id, bmi, lean) VALUES (2022-09-23, 2, 25);
