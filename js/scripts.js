console.log("TESTE");

//  Declarando o formulário

const formulario = document.getElementById("cadastro");

// Declarando cada campo do formulario
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const csenha = document.getElementById("csenha");
const celular = document.getElementById("tel");
const cpf = document.getElementById("cpf");
const rg = document.getElementById("rg");

// Declarando a mensagem de erro

const msgError = document.getElementsByClassName("msgError");

// --------------------------------------------------------------------------- //

// Função para renderizar os diferentes erros do cadastro
const createDisplayMsgError = (mensagem) => {
  msgError[0].textContent = mensagem;
};

// ----- FUNÇÃO PRA VEREFICAR O NOME ------------------------------------------ //

const checkNome = () => {
  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  return nomeRegex.test(nome.value);
};

// ----- FUNÇÃO PRA VEREFICAR O EMAIL ------------------------------------------ //

const checkEmail = (email) => {
  const partesEmail = email.split("@");

  if (
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "gmail.com") ||
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "outlook.com") ||
    (partesEmail.length === 2 && partesEmail[1].toLowerCase() === "hotmail.com")
  ) {
    return true;
  } else {
    return false;
  }
};

// ----- FUNÇÃO PARA VERIFICAR SENHA FORTE ------------------------------------------ //

function checkPasswordStrength(senha) {
  if (!/[a-z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra minúscula!";
  }
  if (!/[A-Z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra maiúscula!";
  }
  if (!/[\W_]/.test(senha)) {
    return "A senha deve ter pelo menos uma caractere especial!";
  }
  if (!/\d/.test(senha)) {
    return "A senha deve ter pelo menos um número!";
  }
  if (senha.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres!";
  }

  return null;
}

// --- FUNÇÃO PARA VERIFICAR IGUALDADE DA SENHA ------------------------------ //

function checkPasswordMatch() {
  return senha.value === csenha.value ? true : false;
}

// --- FUNÇÃO PARA INSERIR MASCARA NO TELEFONE ------------------------------ //

function maskPhoneNumber(event) {
  let celular = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(celular)) {
    createDisplayMsgError("O celular deve conter apenas números");
  } else {
    createDisplayMsgError("");
  }

  celular = celular.replace(/\D/g, ""); // Remove os caracteres que não numéricos

  if (celular.length > 11) {
    celular = celular.substring(0, 11);
  }

  if (celular.length > 2) {
    celular = `(${celular.substring(0, 2)}) ${celular.substring(2)})`;
  } else if (celular.length > 0) {
    celular = `(${celular}Atua)`;
  }

  if (celular.length > 10) {
    celular = celular.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  }

  event.target.value = celular;
}

// --- FUNÇÃO PARA INSERIR MASCARA NO CPF ------------------------------------- //

function maskCPFNumber(event) {
  let CPF = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(CPF)) {
    createDisplayMsgError("O cpf deve conter apenas números");
  } else {
    createDisplayMsgError("");
  }

  // CPF = CPF.replace(/\D/g, ""); // Remove os caracteres que não numéricos

  // if (CPF.length > 11) {
  //   CPF = CPF.substring(0, 11);
  //   CPF = `(${CPF.substring(0, 10)}) ${CPF.substring(10)})`;
  // } else if (CPF.length > 0) {
  //   CPF = `(${CPF}Atua)`;
  // }

  // if (CPF.length > 10) {
  //   CPF = CPF.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  // }

  event.target.value = CPF;

  // --- FUNÇÃO PARA INSERIR MASCARA NO RG ----------------------------------------- //

  // function maskRGNumber(event) {
  //   let RG = event.target.value;

  //   if (/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(rg)) {
  //     createDisplayMsgError("O rg deve conter apenas números!");
  //   } else {
  //     createDisplayMsgError("");
  //   }

  //   RG = RG.replace(/\D/g, ""); // Remove os caracteres que não numéricos

  //   if (RG.length > 10) {
  //     RG = RG.substring(0, 10);
  //   }

  //   if (RG.length > 9) {
  //     RG = RG.replace(/^(\d{2}.?\d{3}.?\d{3})[- ]?(\d{1})$/);
  //   }

  //   if (RG.length > 1) {
  //     RG = `(${RG.substring(0, 1)}) ${RG.substring(1)}`;
  //   } else if (RG.length > 0) {
  //     RG = `(${RG}Atua)`;
  //   }

  // --- FUNÇÃO PARA VERIFICAR IGUALDADE DA SENHA ------------------------------ //

  const rainFunction = () => {
    let rain = document.createElement("span");
    let cont_rain = document.getElementsByClassName("container_rain");
    let left = Math.floor(Math.random() * (310 - 65) + 65);
    let duration = Math.random() * 5;

    rain.classList.add("rain");
    cont_rain[0].appendChild(rain);

    rain.style.left = left + "px";
    rain.style.animationDuration = 1 + duration;

    setTimeout(() => {
      cont_rain[0].removeChild(rain);
    }, 1500);
  };

  setInterval(() => {
    rainFunction();
  }, 250);

  // --------------------------------------------------------------------------- //

  formulario.addEventListener("submit", fetchDatas);

  // CHECANDO O NOME //

  nome.addEventListener("input", () => {
    if (nome.value && !checkNome()) {
      createDisplayMsgError(
        "O nome não pode conter números ou caracteres especiais!"
      );
    } else {
      createDisplayMsgError("");
    }
  });

  // CEHCANDO SE O EMAIL É VALIDO //

  email.addEventListener("input", () => {
    if (email.value && !checkEmail(email.value)) {
      createDisplayMsgError("O e-mail digitado não é válido!");
    } else {
      createDisplayMsgError("");
    }
  });

  // CHECANDO SE A SENHA É FORTE //

  senha.addEventListener("input", () => {
    if (senha.value && checkPasswordStrength(senha.value)) {
      createDisplayMsgError(checkPasswordStrength(senha.value));
    } else {
      createDisplayMsgError("");
    }
  });

  // Mascara no número de celular

  celular.addEventListener("input", maskPhoneNumber);

  // Mascara do CPF

  cpf.addEventListener("input", maskCPFNumber);

  // Mascara do RG

  rg.addEventListener("input", maskRGNumber);

  // VERIFICAÇÃO DE DADOS

  function fetchDatas(event) {
    event.preventDefault();

    if (!checkNome) {
      createDisplayMsgError(
        "O nome não pode conter números ou caracteres especiais!"
      );
      return;
    }

    if (!checkEmail(email.value)) {
      createDisplayMsgError(
        "O nome não pode conter números ou caracteres especiais!"
      );
      return;
    }

    if (!checkPasswordMatch()) {
      createDisplayMsgError("As senhas digitadas não coincidem!");
      return;
    }

    const senhaError = checkPasswordStrength(senha.value);
    if (senhaError) {
      createDisplayMsgError(senhaError);
      return;
    }

    if (celular.value && /[A-Za-zÀ-ÿ]/.test(celular.value)) {
      createDisplayMsgError("O telefone deve conter apenas números");
      return;
    }

    const formData = {
      nome: nome.value,
      email: email.value,
      senha: senha.value,
      celular: celular.value,
      cpf: cpf.value,
      rg: rg.value,
    };

    console.log("Formulário Enviado: ", JSON.stringify(formData, null, 2));
  }
}
