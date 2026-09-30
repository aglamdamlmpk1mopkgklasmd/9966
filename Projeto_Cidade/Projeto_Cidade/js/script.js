const cidade = document.querySelector('#cidade');
let rotacaoX = -16;
let rotacaoY = -14;
let zoom = 1;
let autoRotacao = false;

const botoes = {
  esq: document.getElementById('esq'),
  dir: document.getElementById('dir'),
  cima: document.getElementById('cima'),
  baixo: document.getElementById('baixo'),
  mais: document.getElementById('mais'),
  menos: document.getElementById('menos'),
  auto: document.getElementById('auto'),
  reset: document.getElementById('reset')
};

function atualizarCidade() {
  cidade.style.transform = `rotateX(${rotacaoX}deg) rotateY(${rotacaoY}deg) rotateZ(-10deg) scale(${zoom})`;
}

function ajustarRotacao(eixo, valor) {
  if (eixo === 'x') {
    rotacaoX += valor;
  }
  if (eixo === 'y') {
    rotacaoY += valor;
  }
  atualizarCidade();
}

botoes.esq.addEventListener('click', () => ajustarRotacao('y', -12));
botoes.dir.addEventListener('click', () => ajustarRotacao('y', 12));
botoes.cima.addEventListener('click', () => ajustarRotacao('x', -12));
botoes.baixo.addEventListener('click', () => ajustarRotacao('x', 12));

botoes.mais.addEventListener('click', () => {
  zoom = Math.min(1.8, zoom + 0.12);
  atualizarCidade();
});

botoes.menos.addEventListener('click', () => {
  zoom = Math.max(0.7, zoom - 0.12);
  atualizarCidade();
});

botoes.auto.addEventListener('click', () => {
  autoRotacao = !autoRotacao;
  botoes.auto.textContent = autoRotacao ? 'Pausar' : 'Auto';
});

botoes.reset.addEventListener('click', () => {
  rotacaoX = -16;
  rotacaoY = -14;
  zoom = 1;
  autoRotacao = false;
  botoes.auto.textContent = 'Auto';
  atualizarCidade();
});

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'ArrowLeft') ajustarRotacao('y', -12);
  if (evento.key === 'ArrowRight') ajustarRotacao('y', 12);
  if (evento.key === 'ArrowUp') ajustarRotacao('x', -12);
  if (evento.key === 'ArrowDown') ajustarRotacao('x', 12);
  if (evento.key === '+' || evento.key === '=') {
    zoom = Math.min(1.8, zoom + 0.12);
    atualizarCidade();
  }
  if (evento.key === '-' || evento.key === '_') {
    zoom = Math.max(0.7, zoom - 0.12);
    atualizarCidade();
  }
});

setInterval(() => {
  if (autoRotacao) {
    rotacaoY += 0.6;
    atualizarCidade();
  }
}, 30);

atualizarCidade();
