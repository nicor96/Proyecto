const ORDER_ASC_BY_COST = "Menor precio";
const ORDER_DESC_BY_COST = "Mayor precio";
const ORDER_BY_SOLD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + ` - ` + product.currency +` ` + product.cost + `</h4>
                            <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}
    let filteredArray = [];
    
    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
            //obtengo el array
            currentProductsArray = resultObj.data;
            currentProductsArray = sortProducts(ORDER_ASC_BY_COST, currentProductsArray);
            //esto es para poder usar los filtros si tener que buscar primero
            filteredArray = currentProductsArray;
            //muestra           
            showProductsList(currentProductsArray);
        }
    });

    const searchBar = document.getElementById('searchBar');        

    searchBar.onkeyup = () => {
        let searchString = searchBar.value.toLowerCase();
        filteredArray = currentProductsArray.filter(item => {
            return item.name.toLowerCase().indexOf(searchString) > -1 || item.description.toLowerCase().indexOf(searchString) > -1;
        });
        console.log(filteredArray.length);

        //si encuentra muestra, si no, muestra mensaje
        if(filteredArray.length != 0){
            showProductsList(filteredArray);
        }
        else{
            document.getElementById("cat-list-container").innerHTML = "Producto no encontrado...";
        }

    };
    

    document.getElementById("sortAsc").addEventListener("click", function(){
        filteredArray = sortProducts(ORDER_ASC_BY_COST, filteredArray);

        showProductsList(filteredArray);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        filteredArray = sortProducts(ORDER_DESC_BY_COST, filteredArray);

        showProductsList(filteredArray);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        filteredArray = sortProducts(ORDER_BY_SOLD_COUNT, filteredArray);

        showProductsList(filteredArray);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList(filteredArray);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList(filteredArray);
    });
});