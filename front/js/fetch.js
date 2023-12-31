// ELEMENTOS DO HTML

const section_login = document.querySelector("#section_login");
const section_cadastro = document.querySelector("#section_cadastro");
const section_lista = document.querySelector("#section_lista");

//-------------------------------------------
const URL = "http://localhost:3000";
const estilos = {
  padrao: "1px solid #00000070",
  erro: "1px solid #FF000070",
};
//-------------------------------------------

function trocarTelas(atual, nova) {
  atual.style.opacity = "0";
  nova.style.opacity = "0";

  nova.classList.remove("hidden");

  setTimeout(() => {
    atual.style.display = "none";
    nova.style.display = "flex";
  }, 500);

  setTimeout(() => {
    nova.style.opacity = "1";
  }, 600);
}

function alertaLogin(user, password, titulo) {
  const alerta = document.querySelector(".containerAlerta").style;
  document.querySelector("#tituloAlerta").innerHTML = titulo;
  document.querySelector("#nomeUsuarioAlerta").innerHTML = user;
  document.querySelector("#senhaUsuarioAlerta").innerHTML = password;

  alerta.opacity = "1";
  setTimeout(() => {
    alerta.opacity = "0";
  }, 2500);
}

// --------------------------------------LOGIN------------------------------------
const realizarLogin = async () => {
  const inputUser = document.querySelector("#inputUser");
  const inputPassword = document.querySelector("#inputPassword");
  const alertIncorreto = document.querySelector("#alertIncorreto");

  const urlWithParams = `${URL}/pesquisar?user=${inputUser.value}&password=${inputPassword.value}`;

  try {
    const response = await fetch(urlWithParams, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dados = await response.json();

    if (dados.length >= 1) {
      alertaLogin(inputUser.value, inputPassword.value, "Login com sucesso!");

      alertIncorreto.style.visibility = "hidden";
      inputPassword.style.border = estilos.padrao;
      inputUser.style.border = estilos.padrao;
    } else {
      alertIncorreto.style.visibility = "visible";
      inputPassword.style.border = estilos.erro;
      inputUser.style.border = estilos.erro;

      inputPassword.value = "";
    }
  } catch (error) {
    console.error("Erro na requisição de login:", error);
  }
};

// --------------------------------------CADASTRO------------------------------------
const realizarCadastro = async () => {
  const inputCadUser = document.querySelector("#CadInputUser");
  const inputCadPassword = document.querySelector("#CadInputPassword");
  const CadInputSecondPassword = document.querySelector(
    "#CadInputSecondPassword"
  );
  const senhasDiferentes = document.querySelector("#senhasDiferentes");

  const valorUser = inputCadUser.value;
  const valorPassword = inputCadPassword.value;
  const segundaPassword = CadInputSecondPassword.value;
  if (valorPassword === segundaPassword) {
    try {
      const response = await fetch(`${URL}/cadastrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([valorUser, valorPassword]),
      });
      const dados = await response.json();
      if (dados.validade == true) {
        alertaLogin(
          inputCadUser.value,
          inputCadPassword.value,
          "Cadastro com sucesso!"
        );
        senhasDiferentes.style.visibility = "hidden";
        inputCadUser.value = "";
        inputCadPassword.value = "";
        CadInputSecondPassword.value = "";
        inputCadPassword.style.border = estilos.padrao;
        CadInputSecondPassword.style.border = estilos.padrao;
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o cadastro:", err);
    }
  } else {
    senhasDiferentes.style.visibility = "visible";
    inputCadPassword.value = "";
    CadInputSecondPassword.value = "";
    inputCadPassword.style.border = estilos.erro;
    CadInputSecondPassword.style.border = estilos.erro;
  }
};

// --------------------------------------LISTA------------------------------------

const mostrarLista = async () => {
  const listaCadastros = document.querySelector(".listaCadastros");
  listaCadastros.innerHTML = "";

  trocarTelas(section_login, section_lista)

  try {
    let r = await fetch(URL);
    let dados = await r.json();
    for (let i = 0; i < dados.length; i++) {
      let containerUser = document.createElement("div");
      let pgfNome = document.createElement("p");
      let pgfSenha = document.createElement("p");

      let nome = dados[i].usuario;
      let senha = dados[i].senha;

      pgfNome.innerText = nome;
      pgfSenha.innerText = senha;
      containerUser.appendChild(pgfNome);
      containerUser.appendChild(pgfSenha);
      listaCadastros.appendChild(containerUser);

      containerUser.className = "usuariosDaLista";
    }
  } catch (err) {
    console.log("Erro: " + err);
  }
};

const botaoMostrarUsuarios = document.querySelector(".mostrarUsuarios");
botaoMostrarUsuarios.addEventListener("click", mostrarLista);

const botaoEntrar = document.querySelector("#botaoEntrar");
botaoEntrar.addEventListener("click", realizarLogin);

const botaoCriarConta = document.querySelector("#botaoCriarConta");
botaoCriarConta.addEventListener("click", realizarCadastro);

const voltarLista = document.querySelector(".voltarLista");
voltarLista.addEventListener("click", () => {
  trocarTelas(section_lista, section_login);
});

const botaoTelaCadastrar = document.querySelector("#botaoCadastrar");
botaoTelaCadastrar.addEventListener("click", () =>
  trocarTelas(section_login, section_cadastro)
);

const botaoVoltarCadastro = document.querySelector("#botaoVoltarCadastro");
botaoVoltarCadastro.addEventListener("click", () =>
  trocarTelas(section_cadastro, section_login)
);
