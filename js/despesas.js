const formulario = document.querySelector("#form-despesa");
const mensagem = document.querySelector("#mensagem-despesa");

const despesasSalvas = localStorage.getItem("despesas");
//* busca o que está salvo com o nome "despesas" no localStorage

const despesas = despesasSalvas ? JSON.parse(despesasSalvas) : [];
//* se houver algo salvo, transforma o JSON em dados JavaScript; senão cria um array vazio


function mostrarDespesas() {

    const lista = document.querySelector("#lista-despesas");

    console.log("Lista encontrada");
    console.log("Despesas:", despesas);

    lista.innerHTML = "";

    despesas.forEach(function(despesa, indice) {

        const item = document.createElement("div");

        const valorFormatado = Number(despesa.valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        //* transforma o valor para o formato de real brasileiro

        item.classList.add("item-despesa");

        const partesData = despesa.data.split("-");

        const dataFormatada =
            `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

        item.innerHTML = `
            <p class="descricao-despesa">
                <strong>Descrição:</strong>
                ${despesa.descricao || "Não informado"}
            </p>

            <p class="valor-despesa">
                <strong>Valor:</strong>
                ${valorFormatado}
            </p>

            <p class="data-despesa">
                <strong>Data:</strong>
                ${dataFormatada}
            </p>

            <button class="btn-excluir">Excluir</button>
        `;

        lista.appendChild(item);

        const botaoExcluir = item.querySelector(".btn-excluir");

        botaoExcluir.addEventListener("click", function() {

            const confirmarExclusao =
                confirm("Deseja realmente excluir esta despesa?");

            if (confirmarExclusao) {

                despesas.splice(indice, 1);

                localStorage.setItem(
                    "despesas",
                    JSON.stringify(despesas)
                );

                mostrarDespesas();
            }
        });

    });
}


mostrarDespesas();

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const valor = document.querySelector("#valor").value;
    const descricao = document.querySelector("#descricao").value;
    const data = document.querySelector("#data").value;

    const despesa = {
        valor: valor,
        descricao: descricao,
        data: data
    };

    despesas.unshift(despesa);

    localStorage.setItem(
        "despesas",
        JSON.stringify(despesas)
    );

    mostrarDespesas();

    formulario.reset();

    mensagem.textContent = "Despesa registrada com sucesso!";
    mensagem.style.display = "block";

    setTimeout(function() {
        mensagem.style.display = "none";
    }, 2000);

});