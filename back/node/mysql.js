import mysql from "mysql2/promise";

const getConfig = () => ({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "login",
});

const pegarDados = async () => {
  const connection = await mysql.createConnection(getConfig());

  try {
    const [rows, fields] = await connection.query("SELECT * FROM usuarios");
    return rows;
  } catch (err) {
    throw err;
  } finally {
    await connection.end();
  }
};

const pesquisarDados = async ([user, password]) => {
  const connection = await mysql.createConnection(getConfig());

  try {
    const [rows, fields] = await connection.query(
      "SELECT * FROM usuarios WHERE usuario = ? AND senha = ?",
      [user, password]
    );
    return rows;
  } catch (err) {
    throw err;
  } finally {
    await connection.end();
  }
};

const inserirDados = async ([user, password]) => {
  const connection = await mysql.createConnection(getConfig());

  try {
    await connection.query(
      `INSERT INTO usuarios (usuario, senha) VALUES (?, ?)`,
      [user, password]
    );
  } catch (err) {
    throw err;
  } finally {
    await connection.end();
  }
};

export { pegarDados, inserirDados, pesquisarDados };
