// Formata o título automaticamente com iniciais maiúsculas
function formatarNome(nome) {
    if (!nome) return "";
    return nome.split(' ').map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()).join(' ');
}

const elementoTitulo = document.getElementById("tituloNome");
if (elementoTitulo) {
    elementoTitulo.textContent = formatarNome(elementoTitulo.textContent);
}

// Interatividade dos botões principais e formulários
document.getElementById("meuBotao").addEventListener("click", () => {
    alert("Bem-vinda ao seu site completo com Cadastro, Login e Redes Sociais!");
});

document.getElementById("formCadastro").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Cadastro simulado com sucesso!");
});

document.getElementById("formLogin").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Login realizado com sucesso!");
});