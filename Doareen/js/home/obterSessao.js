document.addEventListener("DOMContentLoaded", getSessao);


function getSessao(){

    let url = "https://doareen.herokuapp.com/api/sessao.php";

    $.ajax({

        url: url,
        type: "POST",
        success: function(response){

            console.log(response);

            if(response){

                document.querySelectorAll(".cabecalho__lista")[1].style.display = "none";
                document.querySelector(".cabecalho__nome").classList.remove("cabecalho__nome-especifico");
                document.querySelector(".cabecalho__nome").innerHTML = eval(response)[1];

            }

        },
        error: function(){

            console.log("Erro");

        }

    });

}