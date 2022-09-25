document.addEventListener("DOMContentLoaded", getSessao);


function getSessao(){

    let url = "https://doareen-zzgi.vercel.app/api/sessao.php";

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