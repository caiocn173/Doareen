document.addEventListener("DOMContentLoaded", () => {

    let cpf = document.querySelector("#cpf");

    cpf.addEventListener("input", () => {

        mascara(cpf, "cpf");

    });

    let telefone = document.querySelector("#telefone");

    telefone.addEventListener("input", () => {

        mascara(telefone, "tel");

    });

    let cep = document.querySelector("#cep");

    cep.addEventListener("input", () => {

        mascara(cep, "cep");

    });

    let botaoCep = document.querySelector(".container__campo-cep-botao");

    botaoCep.addEventListener("click", consultaCEP);

});