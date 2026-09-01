function formatarNome(nome) {
    if (!nome) return "";
    return nome.split(' ').map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()).join(' ');
}

const elementoTitulo = document.getElementById("tituloNome");
if (elementoTitulo) {
    elementoTitulo.textContent = formatarNome(elementoTitulo.textContent);
}

function mostrarSecao(secaoId) {
    const secoes = document.querySelectorAll('.pagina-secao');
    secoes.forEach(secao => {
        secao.classList.remove('ativa');
    });

    const secaoAtiva = document.getElementById('sec-' + secaoId);
    if (secaoAtiva) {
        secaoAtiva.classList.add('ativa');
    }
}

// Lista inicial de produtos de cosméticos com suas categorias definidas
let produtos = [
    { nome: "Batom Matte Luxo", preco: "R$ 49,90", desc: "Alta fixação e cores vibrantes.", imagem: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80", categoria: "maquiagem" },
    { nome: "Sérum Facial Vitamina C", preco: "R$ 89,90", desc: "Ilumina e revitaliza a pele.", imagem: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80", categoria: "skincare" },
    { nome: "Perfume Floral Essencial", preco: "R$ 149,90", desc: "Fragrância marcante e duradoura.", imagem: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80", categoria: "perfumaria" }
];

// Função para filtrar produtos por categoria ao clicar nos botões
function filtrarCategoria(categoriaDesejada) {
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const filtrados = produtos.filter(p => p.categoria === categoriaDesejada);

    if (filtrados.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #d1b8bc;">Nenhum produto encontrado nesta categoria no momento.</p>`;
        mostrarSecao('produtos');
        return;
    }

    filtrados.forEach((prod) => {
        grid.innerHTML += `
            <div class="product-card glow-button">
                <img src="${prod.imagem}" alt="${prod.nome}">
                <div>
                    <h3>${prod.nome}</h3>
                    <p>${prod.desc}</p>
                </div>
                <span class="price">${prod.preco}</span>
            </div>
        `;
    });
    mostrarSecao('produtos');
}

function renderizarProdutos() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    grid.innerHTML = "";
    
    produtos.forEach((prod) => {
        grid.innerHTML += `
            <div class="product-card glow-button">
                <img src="${prod.imagem}" alt="${prod.nome}">
                <div>
                    <h3>${prod.nome}</h3>
                    <p>${prod.desc}</p>
                </div>
                <span class="price">${prod.preco}</span>
            </div>
        `;
    });
}

renderizarProdutos();

// --- SISTEMA DE SEGURANÇA E BLOQUEIO DE ADMIN ---
const SENHA_ADMIN = "Liliane@Cosmeticos#2026!$";
let tentativasErradas = 0;
let tempoBloqueioFim = 0;

function fazerLoginAdmin() {
    const agora = new Date().getTime();

    if (agora < tempoBloqueioFim) {
        const segundosRestantes = Math.ceil((tempoBloqueioFim - agora) / 1000);
        const minutosRestantes = Math.ceil(segundosRestantes / 60);
        alert(`Acesso temporariamente bloqueado por segurança devido a excesso de tentativas. Tente novamente em ${minutosRestantes} minuto(s).`);
        return;
    }

    const senhaDigitada = document.getElementById("adminPasswordInput").value;

    if (senhaDigitada === SENHA_ADMIN) {
        tentativasErradas = 0;
        document.getElementById("adminLoginBox").style.display = "none";
        document.getElementById("adminPanelBox").style.display = "block";
        alert("Acesso autorizado ao painel de controle!");
    } else {
        tentativasErradas++;
        const tentativasRestantes = 3 - tentativasErradas;

        if (tentativasErradas >= 3) {
            tempoBloqueioFim = new Date().getTime() + 5 * 60 * 1000;
            tentativasErradas = 0;
            alert("Senha incorreta inserida 3 vezes! Por segurança, o painel está bloqueado por 5 minutos.");
        } else {
            alert(`Senha incorreta! Você tem mais ${tentantesRestantes || tentativasRestantes} tentativa(s) antes do bloqueio temporal.`);
        }
    }
}

function sairAdmin() {
    document.getElementById("adminLoginBox").style.display = "block";
    document.getElementById("adminPanelBox").style.display = "none";
    document.getElementById("adminPasswordInput").value = "";
}

// Inteligência de reconhecimento automático de categoria baseada no nome digitado
function detectarCategoria(nomeProduto) {
    const nome = nomeProduto.toLowerCase();
    if (nome.includes("batom") || nome.includes("maquiagem") || nome.includes("sombra") || nome.includes("base") || nome.includes("pó") || nome.includes("rímel")) {
        return "maquiagem";
    } else if (nome.includes("perfume") || nome.includes("colônia") || nome.includes("fragrância")) {
        return "perfumaria";
    } else if (nome.includes("cabelo") || nome.includes("shampoo") || nome.includes("máscara") || nome.includes("condicionador")) {
        return "cabelos";
    } else {
        return "skincare";
    }
}

// Adicionar ou atualizar produto pelo painel com reconhecimento automático de categoria e imagem
document.getElementById("formAddProduto").addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("novoNomeProd").value;
    const preco = document.getElementById("novoPrecoProd").value;
    const desc = document.getElementById("novaDescProd").value;
    const inputFoto = document.getElementById("novaFotoProd");

    let imagemUrl = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80";
    
    if (inputFoto.files && inputFoto.files[0]) {
        imagemUrl = URL.createObjectURL(inputFoto.files[0]);
    }

    const categoriaDetectada = detectarCategoria(nome);

    produtos.push({ nome, preco, desc, imagem: imagemUrl, categoria: categoriaDetectada });
    renderizarProdutos();

    alert(`Produto cadastrado e direcionado automaticamente para a categoria: ${categoriaDetectada.toUpperCase()}!`);
    document.getElementById("formAddProduto").reset();
    mostrarSecao('produtos');
});// Função para gerar o link do WhatsApp com a mensagem do produto
function abrirWhatsAppProduto(nomeProduto) {
    const numeroWhatsApp = "5534997129462";
    const mensagem = encodeURIComponent(`Olá, Liliane Machado! Tenho interesse no produto: *${nomeProduto}*. Poderia me passar mais informações?`);
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    window.open(urlWhatsApp, '_blank');
}

// Atualização dinâmica dos botões de compra nos cards de produtos
document.addEventListener("DOMContentLoaded", () => {
    const botoesComprar = document.querySelectorAll(".product-card button, .btn-comprar");
    
    botoesComprar.demorados = true; // apenas garantia de execução
    botoesComprar.forEach(botao => {
        botao.addEventListener("click", (e) => {
            const card = e.target.closest(".product-card");
            if (card) {
                const nomeProduto = card.querySelector("h3, h4, .product-title")?.innerText || "Cosmético Luxo";
                abrirWhatsAppProduto(nomeProduto);
            }
        });
    });
});