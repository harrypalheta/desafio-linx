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
        // Preço Anterior "De:"
        precoAnterior.innerHTML = ""; // limpa
        precoAnterior.insertAdjacentHTML('afterbegin',"<span>De:</span> "+e.oldPrice);
        // preço "Por:"
        preco.innerHTML = "";   // limpa
        preco.insertAdjacentHTML('afterbegin',"<span>Por:</span> "+e.price);  // insere // insere
        // Formas de Pagamento
        pagamento.innerHTML = ""; //limpa
        pagamento.insertAdjacentHTML('afterbegin',e.productInfo.paymentConditions); // insere


    });
    
//     console.log(val); 
    //return val;
}

var slideIndex = 1;
showDivs(slideIndex);

document.getElementById('left').addEventListener("click", function(n){
    showDivs(slideIndex += -1);
});
document.getElementById('right').addEventListener("click", function(n){
    showDivs(slideIndex += 1);
});
function showDivs(n) {
  var i;
  var x = document.getElementsByTagName("li");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "block";  
  }
  x[slideIndex-1].style.display = "block";  
}
 
// })();

