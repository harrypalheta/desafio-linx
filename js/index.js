//(function(){
 
var data;

var vitrine = document.getElementsByClassName("MultiCarousel");
var product = document.querySelectorAll(".MultiCarousel-inner");
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
//    console.log(product);
        if (!product[i]){
            var item = document.querySelectorAll(".item")[0];
//            console.log(item);
            var cln = item.cloneNode(true);
            product[0].appendChild(cln);
            
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
//
//var slideIndex = 1;
//showDivs(slideIndex);
//
//document.getElementById('left').addEventListener("click", function(n){
//    showDivs(slideIndex += -1);
//});
//document.getElementById('right').addEventListener("click", function(n){
//    showDivs(slideIndex += 1);
//});
//function showDivs(n) {
//  var i;
//  var x = document.getElementsByTagName("li");
//  if (n > x.length) {slideIndex = 1}    
//  if (n < 1) {slideIndex = x.length}
//  for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";  
//  }
//  x[slideIndex-1].style.display = "inline-block";  
//}
// 
//// })();
//
$(document).ready(function () {
    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });

    ResCarouselSize();




    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);


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

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");

        });
    }


    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        console.log(divStyle);
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