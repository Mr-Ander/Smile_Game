// Declaração de variáveis globais que controlam o estado do jogo
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true; // Controla se o jogador pode clicar ou não

// Captura os botões no HTML pelo ID
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

/**
 * Função que reinicia o jogo completamente
 * Zera as variáveis, reseta as cartas e botões
 */
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;

  jogarNovamente(); // Reseta visualmente as cartas
  atualizaPlacar(0, 0); // Zera o placar

  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

/**
 * Função que limpa as cartas e remove imagens
 */
function jogarNovamente() {
  jogar = true;

  // Seleciona todas as divs da página
  let cartas = document.getElementsByTagName("div");

  // Reseta as cartas do jogo
  for (let i = 0; i < cartas.length; i++) {
    if (["0", "1", "2", "3"].includes(cartas[i].id)) {
      cartas[i].className = "inicial";
      cartas[i].innerHTML = cartas[i].id;
    }
  }

  // Remove qualquer imagem anterior de acerto ou erro
  document.querySelectorAll('.img-feedback').forEach(img => img.remove());
}

/**
 * Atualiza o placar com acertos, tentativas e desempenho
 */
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

/**
 * Função genérica para exibir imagem de acerto ou erro
 */
function exibirImagemNaCarta(obj, tipo) {
  const img = new Image(100);
  img.className = 'img-feedback';
  img.src = tipo === 'acerto'
    ? "https://kanto.legiaodosherois.com.br/w1200-q95-k1/wp-content/uploads/2022/07/legiao_IuPa8LWJAn_x.jpg.webp"
    : "https://i.pinimg.com/1200x/84/4d/e9/844de9c373ad9fab296f13ca27ada9c6.jpg";

  obj.innerHTML = '';
  obj.appendChild(img);
  obj.className = tipo === 'acerto' ? 'acertou' : 'errou';
}

/**
 * Função chamada ao clicar em uma carta
 * Verifica se o jogador acertou ou errou
 */
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    // Após 4 tentativas, troca botões
    if (tentativas == 4) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    let sorteado = Math.floor(Math.random() * 4);

    if (obj.id == sorteado.toString()) {
      exibirImagemNaCarta(obj, 'acerto');
      acertos++;
    } else {
      exibirImagemNaCarta(obj, 'erro');
      const cartaCerta = document.getElementById(sorteado);
      exibirImagemNaCarta(cartaCerta, 'acerto');
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// Eventos dos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
