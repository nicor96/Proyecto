var tasaDeEnvio = 0;

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");

    cosito = document.getElementById("dropMenuType").innerHTML;
    cosito.innerHTML = "asdad";
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

function cartSubTotal() {
    allProductsCost = document.getElementsByClassName("productSubTotal");
    var acumuladoSubT = 0;
    for (let i = 0; i < allProductsCost.length; i++) {
        acumuladoSubT += parseInt(allProductsCost[i].innerHTML.replace("$", ""));
    }
    document.getElementById("shoppingCartSubTotal").innerHTML = "$" + acumuladoSubT;
}

function cartSendCost() {
    let extra = 0;
    let actual = parseInt(document.getElementById("shoppingCartSubTotal").innerHTML.replace("$", ""))
    switch(tasaDeEnvio){
        case 0 :
            document.getElementById("shoppingCartSendCost").innerHTML = "---";
            cartTotal()
            break;
        case 0.15 :
            extra = actual * tasaDeEnvio
            document.getElementById("shoppingCartSendCost").innerHTML = "$" + extra
            document.getElementById("dropMenuType").innerHTML = "Envío Premium"
            cartTotal()
            break;
        case 0.07 : 
            extra = actual * tasaDeEnvio
            document.getElementById("shoppingCartSendCost").innerHTML = "$" + extra
            document.getElementById("dropMenuType").innerHTML = "Envío Express"
            cartTotal()
            break;
        case 0.05 :
            extra = actual * tasaDeEnvio
            document.getElementById("shoppingCartSendCost").innerHTML = "$" + extra
            document.getElementById("dropMenuType").innerHTML = "Envío Standard"
            cartTotal()
            break;
    }
}

function cartTotal () {
    if(tasaDeEnvio !== 0) {
        let subTotal = parseInt(document.getElementById("shoppingCartSubTotal").innerHTML.replace("$", ""));
        let sendCost = parseInt(document.getElementById("shoppingCartSendCost").innerHTML.replace("$", ""));
        let total = subTotal + sendCost
        document.getElementById("cartTotal").innerHTML = "$" + total
        var botonCheto = document.getElementById("bottonTypeOfPayment");
        console.log(botonCheto);
        botonCheto.style.display = "block";
    }
}

function envioPremium(){
    tasaDeEnvio = 0.15
    cartSendCost()
}

function envioExpress() {
    tasaDeEnvio = 0.07
    cartSendCost()
}

function envioStandard() {
    tasaDeEnvio = 0.05
    cartSendCost()
}


function productSubTotal(quantity, subT, cartProduct) {

    price = cartProduct.unitCost;

    if (cartProduct.currency === "USD") {
        subTotalProducto = quantity * price * 40;
    }
    else {
        subTotalProducto = quantity * price;
    }

    document.getElementById(subT).innerHTML = "$" + subTotalProducto;
    cartSubTotal();
    cartSendCost();
}

function showCart(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let cartProduct = array[i];
        htmlContentToAppend += `
               <div class="list-group-item">

                    <div class="row">

                        <div class="col-5">
                            <img src="` + cartProduct.src + `" align="left" class="img-thumbnail" width="100">
                            <div style="padding-top: 20px;">
                            <small style="padding-left: 10px;"><strong>`+ cartProduct.name + `</strong></small>
                            <br>
                            <small style="padding-left: 10px;">$ `+ cartProduct.currency + "   " + cartProduct.unitCost + ` </small> 
                            </div>
                        </div>

                        <div class="col-3" style="padding-top: 30px; padding-left: 40px;">
                            <input type="number" value="${cartProduct.count}" class="quantity"  min="1">
                        </div>
                
                        <div class="col-3" style="padding-top: 30px;">
                        <p id="productSubTotal`+ i + `"style="color: #343c44; float:right;" class="productSubTotal">$0</p> 
                        </div>

                    </div>

                </div>`
    }
    document.getElementById("cart-display").innerHTML = htmlContentToAppend;

    for (let i = 0; i < array.length; i++) {
        let cartProduct = array[i];
        productSubTotal(cartProduct.count, "productSubTotal" + i, cartProduct);
    }

    let quantity = document.getElementsByClassName("quantity");

    for (let i = 0; i < quantity.length; i++) {
        let cartItem = array[i];
        let coso = quantity[i];

        coso.onchange = function (e) {
            productSubTotal(e.target.value, "productSubTotal" + i, cartItem)
        }
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL_DESAFIATE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCartProductsArray = resultObj.data;
            showCart(currentCartProductsArray.articles);
            cartSubTotal();
            cartSendCost();
        }

    })
});

  
  //Info en el modal


function showPaymentMethods() {
    let content = "";
    let payments = document.getElementsByName("pago");

    for (var i = 0; i < payments.length; i++) {
        if (payments[i].checked) {
            if (payments[i].value == "credit") {
                content = `
                <h5>Nombre del titular</h5>
                <div class="row">
                    <div class="col-8">
                        <input type="text" id="validationCustom01" class="form-control" required>
                    </div>
                    <div class="col"></div>
                </div><br>
                <h5>Número de tarjeta</h5>
                <div class="row">
                  <input type="text" id="validationCustom02" class="form-control col-5 ml-3" required> – 
                  <input type="text" id="validationCustom03" class="form-control col-2" required>
                  <div class="col"></div>
				</div><br>
                <br>
                <h5>Cuotas a pagar</h5>
				<div class="row">
                    <div class="col-5">
                     	<select name="cuotas" class="form-control" required>
                        <option>1</option>
                        <option>2</option>
                        <option>6</option>
                        <option>12</option>
                     	</select>
                    </div>
                    <div class="col"></div>
                </div><br>
              </div>`;

            } else {
                content = `
                <h5>Nombre</h5>
                <h7>Carlos Bueno</h7>
                <br>
                <br>
                <h5>Banco</h5>
                <div">
                    <h7>BROU</h7>
                </div>
                <br>
                <br>
                <h5>Número de cuenta</h5>
                <div>
                    <h7>1456987</h7>
                </div>
                <br>`
            }
        }
    }

    document.getElementById("paymentMethods").innerHTML = content;
}