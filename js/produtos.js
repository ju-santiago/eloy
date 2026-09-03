const formProduto = document.querySelector("#form-produto");
const nomeProduto = document.querySelector("#nome-produto");
const precoProduto = document.querySelector("#preco-produto");
const categoriaProduto = document.querySelector("#categoria-produto");
const listaProdutos = document.querySelector("#lista-produtos");

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

/*let cria uma lista (array) chamada produtos. O JSON.parse transforma o dado do produto em texto para preencher
o array, pois o localStorage só armazena textos. Então ele retorna o array de produtos, caso exista,
ou um array vazio caso não exista, sinalizado pelos símbolos || [] */

function mostrarProdutos() {
    listaProdutos.innerHTML = "";

// literalmente cria a lista de produtos.

    if (produtos.length === 0) {
       listaProdutos.innerHTML = '<p class="sem-produtos">Nenhum produto cadastrado.</p>';
        return;
    }

    /*if verifica se a lista de produtos está vazia. Caso esteja, ele exibe a mensagem "Nenhum produto
    cadastrado", volta pra "estaca zero", retornando para a função.*/

    produtos.forEach(function (produto, indice) {
        const item = document.createElement("div");

        item.classList.add("item-produto");

        item.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>Categoria: ${produto.categoria}</p>
            <p>
                Preço: ${produto.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </p>

              <button class="btn-excluir">
                Excluir
            </button>
        
        `;

         const botaoExcluir =
            item.querySelector(".btn-excluir");

        botaoExcluir.addEventListener("click", function () {
            const confirmarExclusao =
                confirm("Deseja realmente excluir este produto?");

            if (confirmarExclusao) {
                produtos.splice(indice, 1);

                localStorage.setItem(
                    "produtos",
                    JSON.stringify(produtos)
                );

                mostrarProdutos();
            }
        });

/*O item inner html nesse caso é utilizado para criar o conteúdo html dentro do item, onde será formatado
o nome, categoria e preço do produto. O toLocaleString é utilizado para formatar o preço do produto
para o formato de moeda brasileira.*/

listaProdutos.appendChild(item);

    /*O appendChild é utilizado para adicionar o item criado acima, para dentro da lista de produtos.*/
    });
}

formProduto.addEventListener("submit", function (event) {
    event.preventDefault();

/*o EventListener é um comando que diz: quando X evento ocorrer, faça Y ação. Nesse caso,
quando o evento de submit(preenchimento) do formulário ocorrer, a função será executada.
O comando event.preventDefault() evita que a página seja recarregada ao enviar o formulário.*/

    const produto = {
        id: Date.now(),
        nome: nomeProduto.value.trim(),
        preco: Number(precoProduto.value),
        categoria: categoriaProduto.value.trim()
    };

    /*let´s explain guys: const produto cria um objeto chamado produto. Aqui, o produto é formado por:
    id: um número único, nome, preço e categoria. O Date now faz com que o id seja único. O trim remove
    qualquer espaço em branco no início ou no final do valor. O Number transforma o valor do preço em número.*/

produtos.push(produto);

localStorage.setItem("produtos", JSON.stringify(produtos));

mostrarProdutos();

formProduto.reset();

alert("Produto cadastrado com sucesso!");

});

mostrarProdutos();
