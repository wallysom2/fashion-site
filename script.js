const FASHION_API = "https://mock-api.driven.com.br/api/v4/shirts-api/shirts";
let contador = 0;

function selecionarModelo(modeloClicado) {
  const modelo = document.querySelector(".selecionado");
  if (modelo !== null) {
    modelo.classList.toggle("selecionado");
    contador -= 1
  }
  modeloClicado.classList.add("selecionado");
  contador += 1
  liberarBotao()
}

function selecionarGola(golaClicado) {
  const modelo1 = document.querySelector(".selecionado1");
  if (modelo1 !== null) {
    modelo1.classList.toggle("selecionado1");
    contador -= 1
  }
  golaClicado.classList.add("selecionado1");
  contador += 1
  liberarBotao()
}

function selecionarTecido(tecidoClicado) {
  const modelo1 = document.querySelector(".selecionado2");
  if (modelo1 !== null) {
    modelo1.classList.toggle("selecionado2");
    contador -= 1
  }
  tecidoClicado.classList.add("selecionado2");
  contador += 1
  liberarBotao()
}

function urlImagem() {
  const linkImagem = document.querySelector(".receberLink").value;
  let url = linkImagem;
  if (isValidImageURL(url)) {
    alert("Essa url é de uma imagem")
    console.log(isValidImageURL(url))
  } else {
    alert("Deu ruim !!! Essa url não é de uma imagem")
  }
}

function liberarBotao() {

if (contador >=3) {
    const botaoVerde = document.querySelector(".botao")
    botaoVerde.classList.add("botaoLiberado")
  } 
}

function isValidImageURL(str) {
  if (typeof str !== 'string') return false;
  return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi);
}

function obterBlusas () {
  const promise = axios.get (`${FASHION_API}`)
  promise.then (resposta => {
    console.log (resposta.data)
    renderizarBlusas (resposta.data)
  });
  promise.catch (erro => {
    console.error (erro.response);
    alert("Xiii! Deu ruim na hora de receber mensagens!");
  })
}

function renderizarBlusas(blusas) {
  const mostrarBlusas = document.querySelector(".ultimosPedidos");
  mostrarBlusas.innerHTML = "";
  blusas.forEach( blusa => {
      const id = blusa.id;
      const autor = blusa.owner;
      const imagem = blusa.image;
  
 
      mostrarBlusas.innerHTML +=  `
      <div class="ultimosPedidosCada">
      <img src="${imagem}" alt="Blusa">
      <div><span>Criador: </span>${autor}</div>
      </div>
        `
  }) }

  obterBlusas ();