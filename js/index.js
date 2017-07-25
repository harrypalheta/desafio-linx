var data;

var vitrine = document.getElementsByClassName("Vitrine");
var conteudo = document.querySelectorAll(".Vitrine-conteudo");

function X(val){
    // elementos
    var link = conteudo[0].getElementsByClassName('imagem')[0].getElementsByTagName('a')[0];
    var img = conteudo[0].getElementsByClassName('imagem')[0].getElementsByTagName('a')[0].getElementsByTagName('img')[0];
    var descricao = conteudo[0].getElementsByClassName('descricao')[0];
    var preco = conteudo[0].getElementsByClassName('preco')[0];
    var precoAnterior = conteudo[0].getElementsByClassName('precoAnterior')[0];
    var pagamento = conteudo[0].getElementsByClassName('pagamento')[0];
    // Recommendation
    val.data.recommendation.forEach(function(e,i){
        if (!conteudo[i]){
            var item = document.querySelectorAll(".item")[0];
            var cln = item.cloneNode(true);
            conteudo[0].appendChild(cln);
            
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
        if(e.oldPrice){
            precoAnterior.insertAdjacentHTML('afterbegin',"<span>De:</span> "+e.oldPrice);
        }
        
        // preço "Por:"
        preco.innerHTML = "";   // limpa
        preco.insertAdjacentHTML('afterbegin',"<span>Por:</span> "+e.price);  // insere
        
        // Formas de Pagamento
        pagamento.innerHTML = ""; //limpa
        // Formatar decimal da string
        var regex = /[+-]?\d+(\.\d+)?/g;
        var valorFormatado = e.productInfo.paymentConditions.match(regex).map(function(v) { 
            if(/[0-9]+.[0-9]+/g.test(v))
                return e.productInfo.paymentConditions.replace(v,"R$ "+parseFloat(v).toLocaleString('pt-BR',{minimumFractionDigits:2}));
        });
        pagamento.insertAdjacentHTML('afterbegin',valorFormatado[1]); // insere


    });

}

//$(document).ready(function () {
    
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    // document ready
      var vitrineConteudo = document.getElementsByClassName('Vitrine-conteudo');
    var itemLargura = "";
    var anterior = document.getElementsByClassName('anterior')[0];
    var proximo = document.getElementsByClassName('proximo')[0];
    var className = "over";
    // <<- 
    anterior.addEventListener("click", function(){
        click(0, this); 
    });
    // ->>
    proximo.addEventListener("click", function(){
        click(1, this);
    });

    CalculaTamanho();

    window.addEventListener('resize', function(event) {
        CalculaTamanho();
    });


    // Essa função define o tamanho dos itens
    function CalculaTamanho() {
        var itensTela = 0;
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var itemClass = ('.item');

        var TamanhoComBorda = vitrine[0].offsetWidth;
        // classe de bloqueio do botão
        
        var bodyWidth = document.body.offsetWidth;
        var conteudoLista = Array.prototype.slice.call(conteudo);

        conteudoLista.forEach(function(e){

            id = id + 1;
            var qtdeItens = e.children.length;

            // elementos proximos ao botão
            btnParentSb = e.parentElement.getAttribute("data-items");;

            itemsSplit = btnParentSb.split(',');
            e.parentElement.setAttribute("id", "Vitrine" + id);

            if (bodyWidth >= 1200) {
                itensTela = itemsSplit[3];
                itemLargura = TamanhoComBorda / itensTela;
            }
            else if (bodyWidth >= 992) {
                itensTela = itemsSplit[2];
                itemLargura = TamanhoComBorda / itensTela;
            }
            else if (bodyWidth >= 768) {
                itensTela = itemsSplit[1];
                itemLargura = TamanhoComBorda / itensTela;
            }
            else {
                itensTela = itemsSplit[0];
                itemLargura = TamanhoComBorda / itensTela;
            }
           // ajusta o tamanho do coteudo da vitrine
           e.style.transform = "translateX(0px)";
           e.style.width = (itemLargura * qtdeItens)+"px";

           // reajustando o tamanho dos itens 
           for (var j = 0; j < qtdeItens; j++){
                conteudo[0].children[j].style.width = itemLargura+"px";
            }

           // Verifica se está encostado do lado esquerdo
            if (anterior.classList)
                anterior.classList.add(className)
            else 
                anterior.classList.remove(className)
            // Verifica se está encostado do lado direito
            if (proximo.classList)
                proximo.classList.remove(className)
            else 
                proximo.classList.add(className)

        });
    }

    



    // Essa função move os itens
    function MoveItens(e, el, s) {

        var translateXval = '';
        // valor absoluto o tamanho do item
        var xds = Math.abs(el.style.transform.replace(/[^0-9]/g,''));   
        
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemLargura * s);
              proximo.classList.remove(className);
            // quando chegar no inicio, para e adiciona cor forte
            if (translateXval <= itemLargura / 2) {
                translateXval = 0;
                anterior.classList.add(className);
            }
        }
        else if (e == 1) {
            var itemsCondition = el.offsetWidth - el.parentElement.offsetWidth;
            translateXval = parseInt(xds) + parseInt(itemLargura * s);
            anterior.classList.remove(className);
            // Quando chegar no final, para e adiciona cor forte
            if (translateXval >= itemsCondition - itemLargura / 2) {
                translateXval = itemsCondition;
                proximo.classList.add(className);
            }
        }
        // move
        el.style.transform =  'translateX(' + -translateXval + 'px)';

    }

    // Essa função é para o uso do botão
    function click(ell, ee) {
        var el = conteudo[0];  
        var slide = el.parentElement.getAttribute("data-slide");
        MoveItens(ell, el, slide);
    }
  }
};

    

//});