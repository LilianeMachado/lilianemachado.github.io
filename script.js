// Formata o nome automaticamente para a primeira letra maiúscula
function formatarNome(nome) {
    if (!nome) return "";
    return nome.split(' ').map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()).join(' ');
}

const elementoTitulo = document.getElementById("tituloNome");
if (elementoTitulo) {
    elementoTitulo.textContent = formatarNome(elementoTitulo.textContent);
}

// Função para alternar as páginas/seções ao clicar no menu superior
function mostrarSecao(secaoId) {
    // Esconde todas as seções
    const secoes = document.querySelectorAll('.pagina-secao');
    secoes.forEach(secao => {
        secao.classList.remove('ativa');
    });

    // Mostra apenas a seção selecionada
    const secaoAtiva = document.getElementById('sec-' + secaoId);
    if (secaoAtiva) {
        secaoAtiva.classList.add('ativa');
    }
}

// Interatividade dos formulários
document.getElementById("formCadastro").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Cadastro simulado com sucesso!");
});

document.getElementById("formLogin").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Login realizado com sucesso!");
});