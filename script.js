function formatarNome(nome) {
    if (!nome) return "";
    return nome.split(' ').map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()).join(' ');
}

const elementoTitulo = document.getElementById("tituloNome");
if (elementoTitulo) {
    elementoTitulo.textContent = formatarNome(elementoTitulo.textContent);
}

document.getElementById("meuBotao").addEventListener("click", () => {
    alert("Bem-vinda ao seu site com visual moderno e iluminado!");
});

document.getElementById("formCadastro").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Cadastro simulado com sucesso!");
});

document.getElementById("formLogin").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Login realizado com sucesso!");
});