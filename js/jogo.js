// Declaração das variáveis globais que controlam o estado do jogo
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true; // Controla se o jogador pode clicar ou não

// Captura os botões no HTML pelo ID
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

/**
 * Função que reinicia o jogo completamente
 * Zera as variáveis, reseta as divs e mostra/esconde os botões
 */
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;

  jogarNovamente(); // Reseta visualmente as cartas
  atualizaPlacar(0, 0); // Atualiza o placar na tela

  // Exibe o botão "Jogar novamente" e esconde o "Reiniciar"
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

/**
 * Função que limpa as cartas e remove imagens, deixando o jogo pronto para nova rodada
 */
function jogarNovamente() {
  jogar = true;

  // Seleciona todas as divs da página
  let divis = document.getElementsByTagName("div");

  // Percorre todas as divs procurando pelas que têm ID 0 a 3 (as cartas)
  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3) {
      divis[i].className = "inicial"; // Reseta a classe
      divis[i].innerHTML = divis[i].id; // Reexibe o número da carta
    }
  }

  // Remove a imagem de acerto (se existir)
  let imagem = document.getElementById("imagem");
  if (imagem) imagem.remove();

  // Remove a imagem de erro (se existir)
  let imagem22 = document.getElementById("imagem22");
  if (imagem22) imagem22.remove();
}

/**
 * Função que atualiza o placar no HTML
 * @param {number} acertos - total de acertos até agora
 * @param {number} tentativas - total de tentativas feitas
 */
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100; // Calcula percentual
  document.getElementById("resposta").innerHTML =
    "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";
}

/**
 * Função executada quando o jogador acerta a carta correta
 * Exibe uma imagem dentro da carta
 */
function acertou(obj) {
  obj.className = "acertou"; // Altera visualmente a carta

  // Cria a imagem do Smile
  const img = new Image(100); // largura 100px
  img.id = "imagem";
  img.src = "https://kanto.legiaodosherois.com.br/w1200-q95-k1/wp-content/uploads/2022/07/legiao_IuPa8LWJAn_x.jpg.webp"; // Imagem segura para teste

  obj.innerHTML = ""; // Limpa o conteúdo anterior da div
  obj.appendChild(img); // Adiciona a imagem na carta
}

/**
 * Função executada quando o jogador erra a carta
 * Mostra a imagem na carta errada também
 */
function errou(obj) {
  obj.className = "errou"; // Altera a aparência da carta errada

  const img = new Image(100);
  img.id = "imagem22";
  img.src = "https://i.pinimg.com/1200x/84/4d/e9/844de9c373ad9fab296f13ca27ada9c6.jpg"; // Imagem segura para teste

  obj.innerHTML = ""; // Limpa o conteúdo anterior da carta
  obj.appendChild(img); // Adiciona imagem indicando erro
}

/**
 * Função chamada ao clicar em uma carta
 * Define se o jogador acertou ou errou e atualiza o jogo
 */
function verifica(obj) {
  // Só permite jogar se o estado estiver habilitado
  if (jogar) {
    jogar = false; // Bloqueia jogadas até próxima rodada
    tentativas++; // Incrementa tentativas

    // Após 4 tentativas, mostra botão de reinício
    if (tentativas == 4) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    // Gera número aleatório entre 0 e 3
    let sorteado = Math.floor(Math.random() * 4);

    // Verifica se o ID da carta clicada é o mesmo do número sorteado
    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;
    } else {
      errou(obj); // Mostra erro
      const objSorteado = document.getElementById(sorteado); // Encontra a carta correta
      acertou(objSorteado); // Mostra onde estava o Smile
    }

    // Atualiza placar na tela
    atualizaPlacar(acertos, tentativas);
  } else {
    // Jogador tentou jogar sem reiniciar
    alert('Clique em "Jogar novamente"');
  }
}

// Adiciona os eventos de clique aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
