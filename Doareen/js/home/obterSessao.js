document.addEventListener("DOMContentLoaded", getSessao);


function getSessao(){

    let url = "https://doareen.herokuapp.com/api/sessao.php";

    $.ajax({

        url: url,
        type: "POST",
        success: function(response){

            console.log(response);

        },
        error: function(){

            console.log("Erro");

        }

    });

}