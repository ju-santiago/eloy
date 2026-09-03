const vendasSalvas = localStorage.getItem("vendas");
const vendas = vendasSalvas ? JSON.parse(vendasSalvas) : [];

const despesasSalvas = localStorage.getItem("despesas");
const despesas = despesasSalvas ? JSON.parse(despesasSalvas) : [];

const agora = new Date();
const hoje = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, "0")}-${String(agora.getDate()).padStart(2, "0")}`;


// VENDAS DE HOJE

const vendasHoje = vendas.filter(function(venda) {
    return venda.data === hoje;
});

const quantidadePedidosHoje = vendasHoje.length;

const pedidos = document.querySelector("#pedidos-hoje");

pedidos.textContent = quantidadePedidosHoje;


let totalVendasHoje = 0;

vendasHoje.forEach(function(venda) {
    totalVendasHoje += Number(venda.valor);
});

const cardVendasHoje = document.querySelector("#vendas-hoje");

cardVendasHoje.textContent = totalVendasHoje.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
});


// DESPESAS DE HOJE

const despesasHoje = despesas.filter(function(despesa) {
    return despesa.data === hoje;
});

let totalDespesasHoje = 0;

despesasHoje.forEach(function(despesa) {
    totalDespesasHoje += Number(despesa.valor);
});

const cardDespesasHoje = document.querySelector("#despesas-hoje");

cardDespesasHoje.textContent = totalDespesasHoje.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
});

const lucroEstimado = totalVendasHoje - totalDespesasHoje;

const cardLucroEstimado = document.querySelector("#lucro-estimado");

cardLucroEstimado.textContent = lucroEstimado.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
});