document.addEventListener("DOMContentLoaded", getSessao);


function getSessao(){

    let url = "https://doareen.x10.mx/api/sessao.php";

    $.ajax({

        url: url,
        type: "POST",
        success: function(response){

            let resposta = eval(response);
            
            if(resposta){

              	if(document.querySelectorAll(".cabecalho__lista")[1]){
                
                	document.querySelectorAll(".cabecalho__lista")[1].style.display = "none";
                  
                }
                
                document.querySelector(".cabecalho__nome").classList.remove("cabecalho__nome-especifico");
                document.querySelector(".cabecalho__nome").innerHTML = resposta[0].nome_cliente;

            }

        },
        error: function(){

            console.log("Erro");

        }

    });

}