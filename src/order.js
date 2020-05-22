import { getData } from './getDb';
import { loadHeaderFooter } from './loadHeaderFooter';
import { Contact } from './contact';

loadHeaderFooter();

let cart = '';
let html = '';
let myproduct = [];
if (!localStorage.orderList){
    document.getElementsByClassName('panier')[0].innerHTML = "<span class='cart-empty'>Panier Vide</span>";

}else{
    cart = localStorage.orderList.split(",");
    document.getElementById('clear-cart').addEventListener('click', function(event){
        if (confirm("Vider le panier ?")){
            delete localStorage.orderList;
            location.reload();
        }
    });
}

//console.log(cart);
for (let product of cart){
    let ids = product.split("::");
    myproduct.push(ids[1]);
    let item = getData('http://localhost:3000/api/' + ids[0] + '/' + ids[1]).then(res => showOrder(res, ids[0], ids[1], ids[2]));
}

function showOrder(orderList, cat, id, personnalisation){
    //console.log(orderList);
    let table = document.getElementById('panier__list-items--table');
    html +=  "<tr>" +
                    "<td><a href='product.html?id=" + id + "&cat="+ cat +"''>" + orderList.name + "</a></td>" +
                    "<td>" + personnalisation + "</td>" +
                    "<td ><span class='price'>" + orderList.price + "<span></td>" +
                "</tr>";
    table.innerHTML = html;
}

function calculSum(){
    setTimeout (function(){
        let test = document.getElementsByClassName('price');
        var prices = 0;
        for (var i in test){
            if (test[i].textContent){
                prices += parseInt(test[i].textContent);
            }
        }
        console.log(prices);
        document.getElementById('total').innerHTML = "TOTAL : " + prices + "$";
        console.log(myproduct);
        return prices;
    }, 600);
}

calculSum();


if (document.getElementById('submit-form')){
    document.getElementById('submit-form').addEventListener('click', function(event){
        event.preventDefault();
        let client1 = new Contact(document.getElementById('inputFirstName').value, 
                                document.getElementById('inputLastName').value,
                                document.getElementById('inputEmail').value, 
                                document.getElementById('inputAddress').value, 
                                document.getElementById('inputCity').value);
        let productId = window.location.search.substr(4);
        let valueToSend = {contact:client1, products:myproduct};
        testing(valueToSend);
    })
}

function testing(value){
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/teddies/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE){
        console.log(this.responseText);
        localStorage.setItem('orderRecap', this.responseText);
        window.location.href = "order-success.html";
        }
    }
    request.send(JSON.stringify(value));
}


