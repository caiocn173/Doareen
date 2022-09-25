document.addEventListener("DOMContentLoaded", getSessao);

function getSessao(){

    let url = "https://doareen.herokuapp.com/api/sessao.php";

    $.ajax({

        url: url,
        type: "POST",
        success: function(response){

            let resposta = eval(response);
            console.log(resposta);
            if(resposta != null){

                document.querySelector(".secao-perfil__nome h2").innerHTML = resposta[0].nome_cliente;

            }

        },
        error: function(){

            console.log("Erro");

        }

    });

}