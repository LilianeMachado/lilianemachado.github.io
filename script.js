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

// Lista inicial de produtos de cosméticos
let produtos = [
    { nome: "Batom Matte Luxo", preco: "R$ 49,90", desc: "Alta fixação e cores vibrantes.", imagem: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80" },
    { nome: "Sérum Facial Vitamina C", preco: "R$ 89,90", desc: "Ilumina e revitaliza a pele.", imagem: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80" },
    { nome: "Perfume Floral Essencial", preco: "R$ 149,90", desc: "Fragrância marcante e duradoura.", imagem: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80" }
];

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

// Executa ao carregar o site
renderizarProdutos();

// Senha de Administrador (Você pode alterar aqui se quiser)
const SENHA_ADMIN = "lilianeadmin";

function fazerLoginAdmin() {
    const senhaDigitada = document.getElementById("adminPasswordInput").value;
    if (senhaDigitada === SENHA_ADMIN) {
        document.getElementById("adminLoginBox").style.display = "none";
        document.getElementById("adminPanelBox").style.display = "block";
        alert("Acesso autorizado ao painel de controle!");
    } else {
        alert("Senha incorreta! Apenas o administrador pode acessar.");
    }
}

function sairAdmin() {
    document.getElementById("adminLoginBox").style.display = "block";
    document.getElementById("adminPanelBox").style.display = "none";
    document.getElementById("adminPasswordInput").value = "";
}

// Adicionar ou atualizar produto pelo painel
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

    produtos.push({ nome, preco, desc, imagem: imagemUrl });
    renderizarProdutos();

    alert("Produto adicionado com sucesso ao catálogo!");
    document.getElementById("formAddProduto").reset();
    mostrarSecao('produtos');
});