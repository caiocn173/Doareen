document.addEventListener("DOMContentLoaded", () => {

    console.log(window.outerWidth);
    funcaoChat();

});

function funcaoChat(){

    const interessados = document.querySelectorAll(".lista__interessado");
    const botaoVoltar = document.querySelector(".chat-doador__voltar");
    const doador = document.querySelector(".chat-doador__doador");
    const mensagens = document.querySelector(".chat-interessado__mensagens");
    const aviso  = document.querySelector(".aviso");

    interessados.forEach((element) => {

        element.addEventListener("click", () => {

            let nomeInteressado = document.querySelector(".doador__nome");
            let botaoReservar = document.querySelector(".chat-doador__reservar");
            let container = document.querySelector(".chat");
            let lista = document.querySelector(".chat-doador__lista");
            let nomeFormatado = element.dataset.nome.split(" ")

            nomeInteressado.innerText = element.dataset.nome;
            botaoReservar.innerText = "Reservar para " + nomeFormatado[0];
            
            if(window.outerWidth < 768){

                container.classList.add("chat-visivel");
                lista.classList.add("chat-doador__lista-invisivel");
                
            }else{

                doador.style.display = "flex";
                mensagens.style.display = "block";
                aviso.style.display = "none";

            }
                
        });

    });

    botaoVoltar.addEventListener("click", () => {

        let container = document.querySelector(".chat");
        let lista = document.querySelector(".chat-doador__lista");

        if(window.outerWidth < 768){

            container.classList.remove("chat-visivel");
            lista.classList.remove("chat-doador__lista-invisivel");

        }

    });

}