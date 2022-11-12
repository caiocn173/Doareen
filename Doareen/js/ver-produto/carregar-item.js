document.addEventListener("DOMContentLoaded", getItem);

let linksRodape = document.querySelectorAll(".rodape__lista-link");

linksRodape.forEach((element) => {

	element.addEventListener("click", () => {
    
    	localStorage.setItem("categoria", element.dataset.categoria);
    
    });

});

function getItem(){

	let id = localStorage.getItem("Id");
  	let url = "https://doareen.x10.mx/api/carregarItem.php";
  
  	$.ajax({
    
    	url: url,
      	type: "POST",
      	data: {id_item: id},
        success: function(response){
     
          	let item = eval(response);
            console.log(item);
            let container = document.querySelector(".produto");
          
          	item.forEach((element) => {

              let imagem = document.createElement("img");
              imagem.className = "produto__imagem";
              imagem.src = "/api/" + element.nome_imagem;

              container.appendChild(imagem);
              
              let produtoInfo = document.createElement("div");
              produtoInfo.className = "produto__informacoes";
              
              container.appendChild(produtoInfo);
              
              let nomeProduto = document.createElement("h2");
              nomeProduto.className = "produto__titulo";
              nomeProduto.innerHTML = element.nome_item;
              
              produtoInfo.appendChild(nomeProduto);
                            
              let containerLocalidade = document.createElement("div");
              containerLocalidade.className = "categorias__card-cidade-estado produto__localizacao";
              
              produtoInfo.appendChild(containerLocalidade);
              
              let iconeLocalidade = document.createElement("img");
              iconeLocalidade.src = "/Doareen/img/map-pin.svg";
              
              containerLocalidade.appendChild(iconeLocalidade);
              
              let textoLocalidade = document.createElement("label");
              textoLocalidade.className = "categorias__card-descricao categorias__card-localizacao";
              textoLocalidade.innerHTML = element.cidade_cliente + " - " + element.uf_cliente;
              
              containerLocalidade.appendChild(textoLocalidade);
              
              let textoDono = document.createElement("h2");
              textoDono.className = "produto__dono info";
              textoDono.innerHTML = "Publicado por: <label>" + element.nome_cliente + "</label>";
              
              produtoInfo.appendChild(textoDono);
              
              let descricaoProduto = document.createElement("p");
              descricaoProduto.className = "produto__descricao";
              descricaoProduto.innerHTML = element.descricao;
              
              produtoInfo.appendChild(descricaoProduto);
              
              let condicao = document.createElement("h2");
              condicao.className = "produto__condicao";
              condicao.innerHTML = "Estado de uso: <label>" + element.condicao + "</label>";
              
              produtoInfo.appendChild(condicao);
              
              let botao = document.createElement("div");
              botao.className = "produto__botao info";
              botao.innerHTML = "Tenho interesse";
              
              botao.addEventListener("click", processaInteresse);
              
              produtoInfo.appendChild(botao);
              
            });
        
        },
      	error: function(){
        
        	alert("Ocorreu um erro, tente novamente mais tarde.");
        
        }
    
    });

}

function processaInteresse(){

  	let url = "https://doareen.x10.mx/api/processarInteresse.php";
	let id = localStorage.getItem("Id");
  
  	$.ajax({
    
    	url: url,
      	type: "POST",
      	data: {id_item: id},
      	success: function(response){
        	console.log(response);
        	if(response == 0){
            
            	window.location.href = "/Doareen/paginas/login.html";
            
            }else if(response == 1){
            
            	window.location.href = "/Doareen/paginas/meus-interesses.html";
            
            }else if(response == 2){
            
              	window.location.href = "/Doareen/paginas/meus-interesses.html";
              
            }else{
            
            	alert("Este produto não está mais disponível");
              	window.location.href = "/Doareen/paginas";	
            
            }
          
        }
    
    });

}