import { getData } from './import/getDb';
import { loadHeaderFooter } from './include/loadHeaderFooter';

loadHeaderFooter();
submitOrder();

let html = '';
let myproduct = [];

//delete localStorage.orderRecap;

if (!localStorage.orderList){ //Si le Panier est vide
    document.getElementsByClassName('panier')[0].innerHTML = "<span class='cart-empty'>Panier Vide</span>";

}else{
    let cart = localStorage.orderList.split(",");
    document.getElementById('clear-cart').addEventListener('click', function(event){
        if (confirm("Vider le panier ?")){
            delete localStorage.orderList;
            location.reload();
        }
    });
    calculSum();
    for (let product of cart){
        let ids = product.split("::");
        myproduct.push(ids[1]);
        let item = getData('http://localhost:3000/api/' + ids[0] + '/' + ids[1]).then(res => showOrder(res, ids[0], ids[1], ids[2]));
    }
}
class Contact {
    constructor(firstName, lastName, email, address, city){
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}
function submitOrder(){
    if (document.getElementById('order-form')){
        document.getElementById('order-form').addEventListener('submit', function(event){
            event.preventDefault();
            let client1 = new Contact(document.getElementById('inputFirstName').value, 
                                    document.getElementById('inputLastName').value,
                                    document.getElementById('inputEmail').value, 
                                    document.getElementById('inputAddress').value, 
                                    document.getElementById('inputCity').value);
            let productId = window.location.search.substr(4);
            let valueToSend = {contact:client1, products:myproduct};
            postOrder(valueToSend);
        })
    }
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

function postOrder(value){
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


