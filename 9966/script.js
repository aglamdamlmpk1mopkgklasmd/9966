alert("Bem vindo ao laboratório de Multimedia!");
const titulo = document.querySelector("h2");
titulo.style.color = "blue";
titulo.style.fontSize = "50px";
titulo.innerHTML = "Laboratório de Multimedia";

const imagem= document.querySelector("#imagem");


// make this fucntion work multiple times


const botao_rodar = document.getElementById("botao_rodar");
botao_rodar.addEventListener("click", rodar);

let angulorodar = 0;

function rodar(){
    angulorodar += 90;
    imagem.style.transform = `rotate(${angulorodar}deg)`;
}

function crescer(){
    imagem.style.transform = `scale(1.1)`;
}

function encolher(){
    imagem.style.transform = `scale(0.9)`;
}

function mudarCor(){
    imagem.style.backgroundColor = "blue";
}

function reiniciar(){
    imagem.style.transform = `rotate(0deg)`;
    imagem.style.scale = `1`;
    imagem.style.backgroundColor = "black";
}