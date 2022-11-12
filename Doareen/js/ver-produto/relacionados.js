document.addEventListener("DOMContentLoaded", getRelacionados);

function getRelacionados(){

	let id = localStorage.getItem("Id");
  	let url = "https://doareen.x10.mx/api/buscarRelacionados.php";
  
  	$.ajax({
    
    	url: url,
      	type: "POST",
      	data: {id_item: id},
        success: function(response){
     
          	console.log(response);
          	let array_itens = eval(response);
          
          	array_itens.forEach((element) => {
            
              let container = document.createElement("div");
              container.className = "categorias__card";
              container.dataset.id_produto = element.id_item;

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
              
              let botao = document.createElement("a");
              botao.className = "categorias__card-botao";
              botao.innerHTML = "Tenho interesse";
              
              container.addEventListener("click", (event) => {
              
                	verProduto(event);
                	window.location.href = "/Doareen/paginas/ver-produto.html";
              
              });
              
              container.appendChild(botao);
              
              document.querySelector(".categoria__produtos").appendChild(container);
              
            });
        
        },
      	error: function(){
        
        	alert("Ocorreu um erro, tente novamente mais tarde.");
        
        }
    
    });

}

function verProduto(e){

	localStorage.setItem("Id", e.target.offsetParent.dataset.id_produto);
  
}