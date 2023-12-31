-- Cria o banco de dados

CREATE DATABASE IF NOT EXISTS login;

USE login;

CREATE TABLE IF NOT EXISTS usuarios (
    id int auto_increment primary key,
    usuario varchar(255) not null,
    senha varchar(255) not null
);

INSERT INTO usuarios (usuario, senha) VALUES ("teste", "12345");

SELECT * FROM usuarios;
