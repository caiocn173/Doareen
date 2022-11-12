const itensBusca = () => {

	let url = "https://doareen.x10.mx/api/busca.php";
  	let termo = window.location.href.split('=');
  	termo = termo[1];
  
  	document.querySelector(".banner__pesquisa").value = termo;
  
  	$.ajax({
    
    	url: url,
      	type: "POST",
      	data: {termo: termo},
      	success: function(response){
        
        	console.log(response);
          
          	let array_itens = eval(response);
          
          	if(array_itens && array_itens.length > 0){
              
              	document.querySelector(".aviso-busca").style.display = "none";
            
            	array_itens.forEach((element) => {
            
                  let container = document.createElement("div");
                  container.className = "categorias__card";

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
                  botao.href = "/Doareen/paginas/ver-produto.html";
                  botao.dataset.id_produto = element.id_item;

                  botao.addEventListener("click", (event) => {

                        verProduto(event);

                  });

                  container.appendChild(botao);

                  document.querySelector(".categoria__produtos").appendChild(container);
              
            	});
            
            }
        
        }
    
    });

}

document.addEventListener("DOMContentLoaded", itensBusca);