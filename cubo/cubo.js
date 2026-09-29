const cubo = document.querySelector('#cubo');
const cenario = document.querySelector('.cenario');

let parado = false;
let escala = 1;

parar.addEventListener('click', function(){
    parado =!parado;
    cubo.style.animationPlayState = parado ? 'paused' : 'running';
    parar.textContent = parado ? 'Continuar' : 'Pausar';
});

aumentar.addEventListener('click', function(){
    escala = Math.min(10, escala + 1);
    cenario.style.setProperty('--escala', escala);
});

diminuir.addEventListener('click', function(){
    escala = Math.max(1, escala - 1);
    cenario.style.setProperty('--escala', escala);
});

reset.addEventListener('click', function(){
    escala = 1;
    cubo.style.setProperty('--escala', escala);
    parado = false;
    cubo.style.animationPlayState = 'running';
    parar.textContent = 'Parar';
    cubo.style.animationDuration = '8s';
});

rapido.addEventListener('click', function(){
    cubo.style.animationDuration = '4s';
});

normal.addEventListener('click', function(){
    cubo.style.animationDuration = '8s';
});

lento.addEventListener('click', function(){
    cubo.style.animationDuration = '12s';
});

