//(function(){
 
var data;

var vitrine = document.getElementById("vitrine");
var product = document.querySelectorAll("li");
console.log(product);

function X(val){

    // Recommendation
    val.data.recommendation.forEach(function(e,i){
//        function createElement(tag, attr){
//            var node = document.createElement(tag);
//            var textnode = document.createTextNode(attr);
//            node.appendChild(textnode);
//
//            return node;
//        }
//        
        
        if (!product[i]){
            var original = product;
            console.log(i);
            var node = document.createElement(original);
            var clone = original.cloneNode(true);
            vitrine.appendChild(clone);
            //console.log(original);
        }
    
        // link    
        product[i].getElementsByClassName('imagem')[0].getElementsByTagName('a')[0].setAttribute("href", "http:" + e.detailUrl);
        // image
        product[i].getElementsByClassName('imagem')[0].getElementsByTagName('a')[0].getElementsByTagName('img')[0].setAttribute("src", "http:" + e.imageName);
        // name
        product[i].getElementsByClassName('descricao')[0].append(e.name);
        product[i].getElementsByClassName('preco')[0].append(e.price);
        product[i].getElementsByClassName('precoVelho')[0].append(e.oldPrice);
        product[i].getElementsByClassName('pagamento')[0].append(e.productInfo.paymentConditions);

    });
    
//     console.log(val); 
    //return val;
}

 
// })();

