CREATE DATABASE "ApiDB"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Peru.1252'
    LC_CTYPE = 'Spanish_Peru.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;


CREATE TABLE PERSON(
	ID SERIAL PRIMARY KEY,
	NAME_USER VARCHAR,
	EMAIL VARCHAR,
	PASSWORD VARCHAR
);

INSERT INTO PERSON (NAME_USER, EMAIL, PASSWORD) VALUES
('ROMAN', 'roman@wwe.com', '123456'),
('AlAN', 'alan@pkmn.com', '123456'),
('STEVE', 'steve@craft.com', '123456');