import express from "express";
import { pegarDados, inserirDados, pesquisarDados } from "./mysql.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const dados = await pegarDados();
  res.json(dados);
});

app.get("/pesquisar", async (req, res) => {
  const { user, password } = req.query;

  try {
    const dados = await pesquisarDados([user, password]);
    res.json(dados);
  } catch (err) {
    console.error("Erro na pesquisa:", err);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

app.post("/cadastrar", async (req, res) => {
  const [usuario, senha] = req.body;

  try {
    await inserirDados([usuario, senha]);
    console.log("Dados coletados: ", usuario, "/", senha);
    res.json({validade: true})
  } catch (err) {
    throw err;
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
