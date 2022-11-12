document.addEventListener("DOMContentLoaded", getSessao);

let linksRodape = document.querySelectorAll(".rodape__lista-link");

linksRodape.forEach((element) => {

	element.addEventListener("click", () => {
    
    	localStorage.setItem("categoria", element.dataset.categoria);
    
    });

});

function getSessao(){

    let url = "https://doareen.x10.mx/api/sessao.php";

    $.ajax({

        url: url,
        type: "POST",
        success: function(response){

            let resposta = eval(response);
            
            if(resposta != null){

                let  nome = resposta[0].nome_cliente.split(" ");

                document.querySelector(".secao-perfil__nome h2").innerHTML = nome[0];

            }else{

                window.location.href = "/Doareen/paginas/login.html";

            }

        },
        error: function(){

            console.log("Erro");

        }

    });

}

const botaoLogout = document.querySelector(".botao__logout");

botaoLogout.addEventListener("click", logout);

function logout(){

    let  url = "https://doareen.x10.mx/api/logout.php";

    $.ajax({

        url: url,
        type: "POST",
        success: function(response){

            window.location.href = "/Doareen/paginas/index.html";

        },
        error: function(){

            console.log("Erro");

        }

    });

}