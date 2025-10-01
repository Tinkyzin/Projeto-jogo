// mercadoria.js

// Simulação de fetch de produtos 
async function carregarProdutos() {
  return [
    { id: 1, nome: "Camisa Nothing", preco: 89.90 },
    { id: 2, nome: "Pelúcia do Nothing", preco: 149.90 },
    { id: 3, nome: "Pelúcia do Caos", preco: 169.90 }
  ];
}

let produtos = [];
let carrinho = [];

async function iniciarLoja() {
  produtos = await carregarProdutos();

  // adiciona evento em cada botão
  document.querySelectorAll(".produto button").forEach((botao, index) => {
    botao.addEventListener("click", () => {
      adicionarAoCarrinho(produtos[index], botao);
    });
  });
}

// Função para adicionar ao carrinho com loading
async function adicionarAoCarrinho(produto, botao) {
  const loading = document.getElementById("loading");

  // Mostrar tela de loading e desativar botão
  loading.style.display = "flex";
  botao.disabled = true;

  // Simula requisição assíncrona (1 segundo)
  await new Promise(resolve => setTimeout(resolve, 500));

  // Lógica do carrinho
  const item = carrinho.find(p => p.id === produto.id);
  if (item) {
    item.quantidade++;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  renderCarrinho();

  // Esconder loading e reativar botão
  loading.style.display = "none";
  botao.disabled = false;
}

function removerDoCarrinho(id) {
  const item = carrinho.find(p => p.id === id);
  if (item) {
    item.quantidade--;
    if (item.quantidade <= 0) {
      carrinho = carrinho.filter(p => p.id !== id);
    }
  }
  renderCarrinho();
}

function renderCarrinho() {
  let divCarrinho = document.getElementById("carrinho");
  if (!divCarrinho) {
    divCarrinho = document.createElement("div");
    divCarrinho.id = "carrinho";
    document.querySelector("main").appendChild(divCarrinho);
  }

  if (carrinho.length === 0) {
    divCarrinho.innerHTML = "<h2>Carrinho vazio</h2>";
    return;
  }

  let html = "<h2>Seu Carrinho</h2><ul>";
  carrinho.forEach(item => {
    html += `
      <li>
        ${item.nome} - R$ ${item.preco.toFixed(2)} 
        (Qtd: ${item.quantidade})
        <button onclick='adicionarAoCarrinho(${JSON.stringify(item)}, this)'>+</button>
        <button onclick="removerDoCarrinho(${item.id})">-</button>
      </li>
    `;
  });
  html += "</ul>";

  const total = carrinho.reduce((soma, p) => soma + p.preco * p.quantidade, 0);
  html += `<h3>Total: R$ ${total.toFixed(2)}</h3>`;

  divCarrinho.innerHTML = html;
}

// iniciar loja quando a página carregar
iniciarLoja();
