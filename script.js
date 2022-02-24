const FASHION_API = "https://mock-api.driven.com.br/api/v4/shirts-api/shirts";
let contador = 0;
let tipoModelo= null;
let tipoGola= null;
let tipoTecido= null;

function selecionarModelo(modeloClicado,tipoModeloEscolhido) {
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
  const linkPreencido = document.querySelector (".receberLink")

if (contador >=3 && linkPreencido.value !== "") {
    const botaoVerde = document.querySelector(".botao")
    botaoVerde.classList.add("botaoLiberado")
  } }



function obterBlusas () {
  const promise = axios.get (`${FASHION_API}`)
  promise.then (resposta => {
    console.log (resposta.data)
    renderizarBlusas (resposta.data)
    dados = resposta.data;
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

  function postBlusaFeita (){
    const promise = axios.post(
      `${FASHION_API}`,
      {
        "model": tipoModelo,
        "neck": tipoGola,
        "material": tipoTecido,
        "image": urlDigitada,
        "owner": nome,
        "author": nome
      });
      promise.then (resposta => {
        console.log (resposta.data)
        renderizarBlusas (dados);
      });
      promise.catch (erro => {
        console.error (erro.response);
        const qualErro = erro.response;
        alert(`Xiii! Deu ruim na hora de receber mensagens! 
               O erro foi: ${qualErro}`);
      })
  }

 //let nome = prompt ("Qual o seu nome?  ")
  obterBlusas ();
 


  /*
  function urlImagem() {
  const url = document.querySelector(".receberLink").value;
  urlDigitada = url;
  if (isValidImageURL(url)) {
    console.log(isValidImageURL(url))
    return true
  } else {
    console.log(urlDigitada)
    return false
  } 
}

function isValidImageURL(str) {
  if (typeof str !== 'string') return false;
  return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi);
}
*/