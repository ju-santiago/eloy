console.log("Eloy: JavaScript conectado!");

const formulario = document.querySelector("#form-venda");

const produtoVenda = document.querySelector("#produto-venda");

const quantidade = document.querySelector("#quantidade");

const campoValor = document.querySelector("#valor");

const produtosCadastrados =
    JSON.parse(localStorage.getItem("produtos")) || [];

const mensagem = document.querySelector("#mensagem-venda");

const vendasSalvas = localStorage.getItem("vendas");

const vendas = vendasSalvas ? JSON.parse(vendasSalvas) : [];

function carregarProdutos() {
    produtosCadastrados.forEach(function (produto) {
        const opcao = document.createElement("option");

        opcao.value = produto.id;

        opcao.textContent =
            `${produto.nome} - ${produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}`;

        produtoVenda.insertBefore(
            opcao,
            produtoVenda.lastElementChild
        );
    });
}

carregarProdutos();

function atualizarValorVenda() {
    const produtoSelecionado =
        produtosCadastrados.find(function (produto) {
            return String(produto.id) === produtoVenda.value;
        });

    if (produtoSelecionado) {
        const quantidadeSelecionada =
            Number(quantidade.value) || 1;

        campoValor.value =
            (produtoSelecionado.preco * quantidadeSelecionada).toFixed(2);
    }

    if (produtoVenda.value === "personalizado") {
        campoValor.value = "";
        campoValor.focus();
    }
}

produtoVenda.addEventListener(
    "change",
    atualizarValorVenda
);

quantidade.addEventListener(
    "input",
    atualizarValorVenda
);

function mostrarVendas() { const lista = document.querySelector("#lista-vendas");

    lista.innerHTML = "";
    
    vendas.forEach(function(venda, indice) {
        const item = document.createElement("div");

        const valorFormatado = Number(venda.valor).toLocaleString("pt-BR", {

    style: "currency",

    currency: "BRL"
});

        item.classList.add("item-venda");

        const partesData = venda.data.split("-");

        const dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

                item.innerHTML = `
   <p class="cliente-venda"><strong>Cliente:</strong> ${venda.cliente || "Não informado"}</p>

   <p class="valor-venda"><strong>Valor:</strong> ${valorFormatado}</p>

   <p class="data-venda"><strong>Data:</strong> ${dataFormatada}</p>

   <button class="btn-excluir">Excluir</button>`;

        lista.appendChild(item);
        const botaoExcluir = item.querySelector(".btn-excluir");

        botaoExcluir.addEventListener("click", function() {

            const confirmarExclusao = confirm("Deseja realmente excluir esta venda?");

            if (confirmarExclusao) {
            vendas.splice(indice, 1);

localStorage.setItem("vendas", JSON.stringify(vendas));

mostrarVendas();

            }

});

});

}

mostrarVendas();

    console.log("Lista de vendas:");

        console.log(vendas);

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const valor = document.querySelector("#valor").value;
    const cliente = document.querySelector("#cliente").value;
    const data = document.querySelector("#data").value;
    const produtoSelecionado = document.querySelector("#produto-venda").value;


    const venda = {
        valor: valor,
        cliente: cliente,
        data: data,
        produto: produtoSelecionado,
        quantidade: Number(quantidade.value)
    };

    vendas.unshift(venda);

    localStorage.setItem("vendas", JSON.stringify(vendas));

    mostrarVendas();

    formulario.reset();

    mensagem.textContent = "Venda registrada com sucesso!";
    mensagem.style.display = "block";

setTimeout(function() {
    mensagem.style.display = "none";
}, 2000);

});