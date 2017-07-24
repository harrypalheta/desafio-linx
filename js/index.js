//(function(){
 
var data;

var vitrine = document.getElementsByClassName("Vitrine");
var conteudo = document.querySelectorAll(".Vitrine-conteudo");
//console.log(conteudo);

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
//    console.log(conteudo);
        if (!conteudo[i]){
            var item = document.querySelectorAll(".item")[0];
//            console.log(item);
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
        preco.insertAdjacentHTML('afterbegin',"<span>Por:</span> "+e.price);  // insere // insere
        // Formas de Pagamento
        pagamento.innerHTML = ""; //limpa
        pagamento.insertAdjacentHTML('afterbegin',e.productInfo.paymentConditions); // insere


    });

}

$(document).ready(function () {

    var itemsDiv = ('.Vitrine-conteudo');
    var itemWidth = "";
    var anterior = document.getElementsByClassName('anterior')[0];
    var proximo = document.getElementsByClassName('proximo')[0];
    // <<- 
    anterior.addEventListener("click", function(n,e){
        click(0, this); 
    });
    // ->>
    proximo.addEventListener("click", function(n,e){
        click(1, this);
    });

    CalculaTamanho();

    window.addEventListener('resize', function(event) {
        CalculaTamanho();
    });


    // Essa função define o tamanho dos itens
    function CalculaTamanho() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';

        var sampwidth = vitrine[0].offsetWidth;
        // classe de bloqueio do botão
        var className = "over";
        
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "Vitrine" + id);


            if (bodyWidth >= 1200) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 992) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }
            else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

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


    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.anterior');
        var rightBtn = ('.proximo');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
     
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

});