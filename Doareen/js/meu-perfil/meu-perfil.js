document.addEventListener("DOMContentLoaded", getSessao);
document.addEventListener("DOMContentLoaded", getItens);

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

function getItens(){

	let url = "https://doareen.x10.mx/api/itensPublicados.php";
  
  	$.ajax({
    
    	url: url,
      	type: "POST",
      	success: function(response){
        	console.log(response);
          	let array_itens = eval(response);
          
          	array_itens.forEach((element) => {
            
              let container = document.createElement("div");
              container.className = "categorias__card card__meu-perfil";
              container.addEventListener("click", () => {
              
                if(element.status == "doado"){
                
                	window.location.href = "/Doareen/paginas/historico.html";
                  
                }else{
                
                	localStorage.setItem("Id", element.id_item);
                	window.location.href = "/Doareen/paginas/chat-doador.html";
                
                }
              
              });
              
              if(element.qtd_interessados > 0 && element.status != "doado"){
              
                let containerInteressados = document.createElement("div");
                containerInteressados.className = "container__interessados";

                container.appendChild(containerInteressados);

                let qtd = document.createElement("p");
                qtd.innerHTML = element.qtd_interessados;
                
                containerInteressados.appendChild(qtd);

              }  
              
              let imagem = document.createElement("img");
              imagem.className = "categorias__card-imagem";
              imagem.src = "/api/" + element.nome_imagem;

              container.appendChild(imagem);
              
              let containerLocalidade = document.createElement("div");
              containerLocalidade.className = "categorias__card-cidade-estado";
              
              let iconeLocalidade = document.createElement("img");
              iconeLocalidade.src = "/Doareen/img/map-pin.svg";
              
              containerLocalidade.appendChild(iconeLocalidade);
              
              let textoLocalidade = document.createElement("label");
              textoLocalidade.className = "categorias__card-descricao categorias__card-localizacao";
              textoLocalidade.innerHTML = element.cidade + " - " + element.uf;
              
              containerLocalidade.appendChild(textoLocalidade);
              
              container.appendChild(containerLocalidade);
              
              let nomeProduto = document.createElement("h2");
              nomeProduto.className = "categorias__card-descricao categorias__card-titulo";
              nomeProduto.innerHTML = element.nome_item;
              
              container.appendChild(nomeProduto);
              
              let descricaoProduto = document.createElement("p");
              descricaoProduto.className = "categorias__card-descricao categorias__card-texto";
              descricaoProduto.innerHTML = element.descricao;
              
              container.appendChild(descricaoProduto);
              
              let botao = document.createElement("div");
              
              if(element.status == "disponivel"){
              
                botao.className = "categorias__card-botao disponivel";
                botao.innerHTML = "Disponível";
                
              }else if(element.status == "reservado"){
              
              	botao.className = "categorias__card-botao reservado";
                botao.innerHTML = "Reservado";
              
              }else{
              
              	botao.className = "categorias__card-botao doado";
                botao.innerHTML = "Doado";
              
              }
              
              container.appendChild(botao);
              
              document.querySelector(".categoria__produtos").appendChild(container);
              
            });
          
            
        
        }
    
    });

}