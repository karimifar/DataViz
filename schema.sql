DROP DATABASE IF EXISTS imr_db;
CREATE DATABASE imr_db;

USE imr_db;


CREATE TABLE imr (
    id int NOT NULL AUTO_INCREMENT,
    Zip INTEGER(5) NOT NULL,
    IMR DECIMAL(5,2),
    LowerCI DECIMAL(5,2),
    UpperCI DECIMAL(5,2),
    SE DECIMAL(5,2),
    IMR_B DECIMAL(5,2),
    IMR_W DECIMAL(5,2),
    IMR_H DECIMAL(5,2),
    SE_B DECIMAL(5,2),
    LowerCI_B DECIMAL(5,2),
    UpperCI_B DECIMAL(5,2),
    SE_W DECIMAL(5,2),
    LowerCI_W DECIMAL(5,2),
    UpperCI_W DECIMAL(5,2),
    SE_H DECIMAL(5,2),
    LowerCI_H DECIMAL(5,2),
    UpperCI_H DECIMAL(5,2),
    BirthCat VARCHAR(15),
    BirthCat_B VARCHAR(15),
    BirthCat_H VARCHAR(15),
    BirthCat_W VARCHAR(15),
    Flag INTEGER(1),
    Flag_W INTEGER(1),
    Flag_B INTEGER(1),
    Flag_H INTEGER(1),
    Lat FLOAT,
    Lng FlOAT,
    City VARCHAR(45),
    County VARCHAR (45),
    PRIMARY KEY (id)
);


SELECT * FROM imr;

SELECT max(IMR_B) FROM imr;