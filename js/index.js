//(function(){
 
var data;

var vitrine = document.getElementById("vitrine");
var product = document.querySelectorAll("li");
//console.log(product);

function X(val){
    // elementos
    var link = product[0].getElementsByClassName('imagem')[0].getElementsByTagName('a')[0];
    var img = product[0].getElementsByClassName('imagem')[0].getElementsByTagName('a')[0].getElementsByTagName('img')[0];
    var descricao = product[0].getElementsByClassName('descricao')[0];
    var preco = product[0].getElementsByClassName('preco')[0];
    var precoAnterior = product[0].getElementsByClassName('precoAnterior')[0];
    var pagamento = product[0].getElementsByClassName('pagamento')[0];
    // Recommendation
    val.data.recommendation.forEach(function(e,i){
    
        if (!product[i]){
            var li = vitrine.firstElementChild;
            var cln = li.cloneNode(true);
            vitrine.appendChild(cln);
            
        }
    
        // link    
        link.setAttribute("href", "http:" + e.detailUrl);
        // imagem
        img.setAttribute("src", "http:" + e.imageName);
        // descrição
        descricao.innerHTML = ""; // limpa
        descricao.append(e.name); // insere
        // preço
        preco.innerHTML = "";   // limpa
        preco.append(e.price);  // insere
        // Preço Anterior
        precoAnterior.innerHTML = ""; // limpa
        precoAnterior.append(e.oldPrice); // insere
        // Formas de Pagamento
        pagamento.innerHTML = ""; //limpa
        pagamento.insertAdjacentHTML('afterbegin',e.productInfo.paymentConditions); // insere


    });
    
//     console.log(val); 
    //return val;
}

 
// })();

