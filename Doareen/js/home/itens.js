document.addEventListener("DOMContentLoaded", getItens);

let links = document.querySelectorAll(".container__ver-tudo");

links.forEach((element) => {

	element.addEventListener("click", () => {
    
    	localStorage.setItem("categoria", element.dataset.categoria);
    
    });

});

let linksRodape = document.querySelectorAll(".rodape__lista-link");

linksRodape.forEach((element) => {

	element.addEventListener("click", () => {
    
    	localStorage.setItem("categoria", element.dataset.categoria);
    
    });

});

function getItens(){

	let url = "https://doareen.x10.mx/api/itensTelaInicial.php";
    let containers = document.querySelectorAll(".categorias__container");
  
  	$.ajax({
    
    	url: url,
        type: "POST",
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
              		console.log(event)
              });
              
              container.appendChild(botao);
              
              if(element.categoria == "Móvel" && containers[0].children.length <= 4){
              
                containers[0].appendChild(container);
              
              }else if(element.categoria == "Eletrodoméstico" && containers[1].children.length <= 4){
              
              	containers[1].appendChild(container);
                
              }else if(element.categoria == "Utensílio" && containers[2].children.length <= 4){
              
              	containers[2].appendChild(container);
              
              }
              
            });
          
        }
    
    });

}

function verProduto(e){

	localStorage.setItem("Id", e.target.offsetParent.dataset.id_produto);
  
}