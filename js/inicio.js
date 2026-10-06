console.log("Eloy: Página inicial conectada!");

// ===============================
// ELEMENTOS DA PÁGINA
// ===============================

const vendasHojeElemento = document.querySelector("#vendas-hoje");
const pedidosHojeElemento = document.querySelector("#pedidos-hoje");
const despesasHojeElemento = document.querySelector("#despesas-hoje");
const lucroEstimadoElemento = document.querySelector("#lucro-estimado");


// ===============================
// DADOS DO LOCALSTORAGE
// ===============================

const vendasSalvas = localStorage.getItem("vendas");
const despesasSalvas = localStorage.getItem("despesas");

const vendas = vendasSalvas ? JSON.parse(vendasSalvas) : [];
const despesas = despesasSalvas ? JSON.parse(despesasSalvas) : [];


// ===============================
// DATA DE HOJE
// ===============================

function obterDataHoje() {

    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}


// ===============================
// ATUALIZAR RESUMO
// ===============================

function atualizarResumo() {

    const hoje = obterDataHoje();

    // -------------------------------
    // VENDAS DE HOJE
    // -------------------------------

    const vendasDeHoje = vendas.filter(function (venda) {
        return venda.data === hoje;
    });

    const valorVendasHoje = vendasDeHoje.reduce(function (total, venda) {

        return total + Number(venda.valor);

    }, 0);


    // -------------------------------
    // PEDIDOS DE HOJE
    // -------------------------------

    const pedidosHoje = vendasDeHoje.length;


    // -------------------------------
    // DESPESAS DE HOJE
    // -------------------------------

    const despesasDeHoje = despesas.filter(function (despesa) {
        return despesa.data === hoje;
    });

    const valorDespesasHoje = despesasDeHoje.reduce(function (total, despesa) {

        return total + Number(despesa.valor);

    }, 0);


    // -------------------------------
    // LUCRO ESTIMADO
    // -------------------------------

    const lucroEstimado =
        valorVendasHoje - valorDespesasHoje;


    // ===============================
    // MOSTRAR NA TELA
    // ===============================

    vendasHojeElemento.textContent =
        valorVendasHoje.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });


    pedidosHojeElemento.textContent =
        pedidosHoje;


    despesasHojeElemento.textContent =
        valorDespesasHoje.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });


    lucroEstimadoElemento.textContent =
        lucroEstimado.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });


    console.log("Resumo atualizado!");
    console.log("Vendas de hoje:", vendasDeHoje);
    console.log("Despesas de hoje:", despesasDeHoje);
    console.log("Lucro estimado:", lucroEstimado);
}


// ===============================
// EXECUTAR
// ===============================

atualizarResumo();
