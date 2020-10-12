var CommentsArray = [];
var relatedProducts = [];


function showProductsInfo(array, photos){

    let htmlContentToAppend = "";

            htmlContentToAppend += `
            <div class="container">
                <h2> ` + array.name + ` </h2>
                <hr>
                <p style><strong>Precio</strong>
                <br>
                 ` + array.currency + ` ` + array.cost + ` </p>
                <p> <strong>Descripcion</strong>
                <br>
                 ` + array.description + ` </p>
                <p> <strong>Categoria</strong>
                <br>
                <a href="category-info.html"> ` + array.category + ` </a> </p>
                <p> <strong>Cantidad de vendidos</strong>
                <br>
                 ` + array.soldCount + ` </p>
            </div>      
            `

        document.getElementById("product_info").innerHTML = htmlContentToAppend;
    
}


function showCarousel(photos){

    let gallery = "";
        
        console.log(photos);
        for(let i = 0; i < photos.length; i++) {    
            let imageSrc = photos[i];
            console.log(photos);
            if(i==0){
                gallery += `
                    <div class="carousel-item active">
                        <img src="`+ imageSrc +`"  class="d-block w-100">
                    </div>
                `
            }
            else {
                gallery += `
                    <div class="carousel-item">
                        <img src="`+ imageSrc +`" class="d-block w-100">
                    </div>
                `
            }
        }
        document.getElementById("carousel_ph").innerHTML = gallery;
}


function indiceCarousel(l) {
    let indices = "";
    for(let i=0; i<l; i++) {
        if(i==0){
            indices += `
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            `
        }
        else {
            indices += `
                <li data-target="#carouselExampleIndicators" data-slide-to="`+i+`"></li>
            `
        }
    }
    document.getElementById("carousel_indice").innerHTML = indices;
}


function starRating(score){
    let stars = "";
    let contador = 0;
    
    for(let i = 0; i < score; i++) {
        stars += `
        <span class="fa fa-star"></span>
        `
        contador ++;
    }
    while(contador !=5) {
        stars += `
        <span class="fa fa-star-o"></span>
        `
        contador ++;
    }
    return stars;
}


function showComments(array) {

    let htmlContentToAppend = "";

            htmlContentToAppend += `
                <div class="container">
                <h5><strong>Comentarios</strong></h5>
                <hr>
                </div>      
            `
            for(let i = 0; i < array.length; i++) {
                let date = array[i].dateTime;
                let score = array[i].score;
                let user = array[i].user;
                let comment = array[i].description;

                htmlContentToAppend += `
                    <div class="container">
                        <h5><strong>` + user + ` </strong> - ` + date + ` - ` + starRating(score) + `<h5>
                        <p>` + comment + `</p>
                        <hr>
                    </div>      
                    `
            }

        document.getElementById("product_comments").innerHTML = htmlContentToAppend;
    
}


function showRelated(array, related) {
    let htmlContentToAppend = "";
    for(i=0; i<related.length; i++) {
        htmlContentToAppend += `
        <div class="col-md-4">
        <img src="` + array[related[i]].imgSrc + `" alt="" class="img-thumbnail">
        <p style="font-size: 30px;">`+ array[related[i]].currency +` `+ array[related[i]].cost +`</p>
        <p>`+ array[related[i]].description +`</p>
        </div>
       `
    }
    document.getElementById("related_products").innerHTML = htmlContentToAppend;
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
        ProductInfoArray = resultObj.data;
        ProductImageArray = resultObj.data.images;
        showProductsInfo(ProductInfoArray);
        indiceCarousel(ProductImageArray.length);
        showCarousel(ProductImageArray);
        relatedProducts = ProductInfoArray.relatedProducts;
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
        CommentsArray = resultObj.data;
        showComments(CommentsArray);
        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
        otherProducts = resultObj.data;
        showRelated(otherProducts, relatedProducts);
        }
    });

});


const comment_input = document.getElementById("send_comment");
const stars=document.querySelector(".ratings").children;


for(let i=0; i < stars.length; i++) {
    stars[i].addEventListener("mouseover", function(){
        for(let j=0; j<stars.length; j++) {
            stars[j].classList.remove("fa-star");
            stars[j].classList.add("fa-star-o");
        }
        for(let j=0; j<=i; j++) {
            stars[j].classList.remove("fa-star-o");
            stars[j].classList.add("fa-star");
        }
    })
    stars[i].addEventListener("mouseover", function() {
        rating = i+1;
    })
}


function arreglaFecha(n) {
    if(n < 10) {
        return "0" + n;
    }
    else {
        return n;
    }
}


comment_input.onsubmit = function(e) {
    e.preventDefault();     

    var comment_data = {
        dateTime: 'fecha',
        score: 'estrellas',
        user: 'usuario',
        description: 'comentario',
        }; 

    comment_data.user = localStorage.getItem("email");
    comment_data.description = document.getElementById("comment_text").value;
    var f = new Date();
    comment_data.dateTime = f.getFullYear() + "-" + arreglaFecha(f.getMonth() +1) + "-" + arreglaFecha(f.getDate()) + "  " + arreglaFecha(f.getHours()) + ":" + arreglaFecha(f.getMinutes()) + ":" + arreglaFecha(f.getSeconds());
    comment_data.score = rating;

    CommentsArray.push(comment_data);   
    showComments(CommentsArray);       
}