const FASHION_API = "https://mock-api.driven.com.br/api/v4/shirts-api/shirts";
let contador = 0;
let tipoModelo = null;
let tipoGola = null;
let tipoTecido = null;
let dados;
let urlDigitada = null;

function selecionarModelo(modeloClicado, tipoModeloEscolhido) {
  const modelo = document.querySelector(".selecionado");
  tipoModelo = tipoModeloEscolhido;
  if (modelo !== null) {
    modelo.classList.toggle("selecionado");
    contador -= 1
  }
  modeloClicado.classList.add("selecionado");
  contador += 1
  liberarBotao()
}

function selecionarGola(golaClicado, tipoGolaEscolhido) {
  const modelo1 = document.querySelector(".selecionado1");
  tipoGola = tipoGolaEscolhido;
  if (modelo1 !== null) {
    modelo1.classList.toggle("selecionado1");
    contador -= 1
  }
  golaClicado.classList.add("selecionado1");
  contador += 1
  liberarBotao()
}

function selecionarTecido(tecidoClicado, tipoTecidoEscolhido) {
  const modelo1 = document.querySelector(".selecionado2");
  tipoTecido = tipoTecidoEscolhido;
  if (modelo1 !== null) {
    modelo1.classList.toggle("selecionado2");
    contador -= 1
  }
  tecidoClicado.classList.add("selecionado2");
  contador += 1
  liberarBotao()
}

function liberarBotao() {
  let liberar = "não"
  const linkPreencido = document.querySelector(".receberLink")
  urlDigitada = linkPreencido.value;

  if (linkPreencido.value.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null) {
    liberar = "sim"
    console.log(liberar)
  } else {
    const naoPodeClicar = document.querySelector(".botaoClicavel")
    naoPodeClicar.innerHTML = `<button class="botao">Confirmar pedido</button>`
    const linkInvalido = document.querySelector(".receberLink")
    linkInvalido.value = "";
  }

  if (contador >= 3 && liberar == "sim") {
    const botaoPodeClicar = document.querySelector(".botaoClicavel")
    botaoPodeClicar.innerHTML = `<button class="botao" onclick="postBlusaFeita()"> Confirmar pedido</button>`
    const botaoAzul = document.querySelector(".botao")
    botaoAzul.classList.add("botaoLiberado")
  }
}

function obterBlusas() {
  const promise = axios.get(`${FASHION_API}`)
  promise.then(resposta => {
    console.log(resposta.data)
    renderizarBlusas(resposta.data)
  });
  promise.catch(erro => {
    console.error(erro.response);
    alert("Xiii! Deu ruim na hora de receber mensagens!");
  })
}

function renderizarBlusas(blusas) {
  dataBlusas = blusas
  const mostrarBlusas = document.querySelector(".ultimosPedidos");
  mostrarBlusas.innerHTML = "";
  blusas.forEach(blusa => {
    const id = blusa.id;
    const autor = blusa.owner;
    const imagem = blusa.image;


    mostrarBlusas.innerHTML += `
      <div class="ultimosPedidosCada">
      <img src="${imagem}" alt="Blusa">
      <div><span>Criador: </span>${autor}</div>
      </div>
        `
  })
}

function postBlusaFeita() {
  const promise = axios.post(
    `${FASHION_API}`, {
      "model": tipoModelo,
      "neck": tipoGola,
      "material": tipoTecido,
      "image": urlDigitada,
      "owner": nome,
      "author": nome
    });
  promise.then(resposta => {
    // alert("Encomenda confirmada  =)"); 
    console.log(resposta.data)
    obterBlusas();
    console.log(resposta.data)
  });
  promise.catch(erro => {
    console.error(erro.response);
    alert("Ops, não conseguimos processar sua encomenda");
  })
}

let nome = prompt("Qual o seu nome?  ")
obterBlusas();