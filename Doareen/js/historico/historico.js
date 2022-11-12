const getItens = () => {

	let url = "https://doareen.x10.mx/api/historico.php";
  
  	$.ajax({
    
    	url: url,
      	type: "POST",
      	success: function(response){
        
        	console.log(response);
          
         	if(response != 0){
          
              let array_itens = eval(response);

              array_itens.forEach((element) => {

                  let container = document.createElement("div");
                  container.className = "produtos-interessados historico__card";

                  let containerInformacoes = document.createElement("div");
                  containerInformacoes.className = "interessados__informacoes";

                  container.appendChild(containerInformacoes);

                  let imagem = document.createElement("img");
                  imagem.className = "card__imagem";
                  imagem.src = "/api/" + element.nome_imagem;

                  containerInformacoes.appendChild(imagem);

                  let containerDados = document.createElement("div");
                  containerDados.className = "card__container";

                  containerInformacoes.appendChild(containerDados);

                  let titulo = document.createElement("h2");
                  titulo.className = "card__titulo";
                  titulo.innerHTML = element.nome_item;

                  containerDados.appendChild(titulo);

                  let descricao = document.createElement("p");
                  descricao.className = "card__descricao";
                  descricao.innerHTML = element.descricao;

                  containerDados.appendChild(descricao);

                  let containerDadosDoacao = document.createElement("div");
                  containerDadosDoacao.className = "card__dados-doacao";

                  let recebedor = document.createElement("h2");
                  recebedor.innerHTML = "Doado para: " + element.nome_cliente;
                  recebedor.className = "card__dados-texto";

                  containerDadosDoacao.appendChild(recebedor);

                  let data = document.createElement("h3");
                  data.innerHTML = "Data da doação: " + element.data_doacao;

                  containerDadosDoacao.appendChild(data);

                  container.appendChild(containerDadosDoacao);

                  document.querySelector(".historico__container").appendChild(container);

              });
              
            }else{
            
            	window.location.href = "/Doareen/paginas/login.html";
            
            }
        
        }
    
    });

}

document.addEventListener("DOMContentLoaded", getItens);