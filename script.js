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

document.getElementById("formCadastro").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Cadastro de cliente realizado com sucesso!");
});

document.getElementById("formLogin").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Login realizado com sucesso!");
});