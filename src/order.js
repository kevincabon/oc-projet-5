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
    let cart = localStorage.orderList.split(","); //Récupère la liste des articles de la commande
    document.getElementById('clear-cart').addEventListener('click', function(event){
        if (confirm("Vider le panier ?")){
            delete localStorage.orderList;
            location.reload();
        }
    });
    calculSum();
    for (let product of cart){
        let ids = product.split("::"); //Split les données pour récupérer les données : catégories, id et personnalisation du produit
        myproduct.push(ids[1]); //Liste des ID qui vont être envoyer dans le POST
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
            let valueToSend = {contact:client1, products:myproduct}; //Contient la class Contact et la liste des ID des produits commandé
            postOrder(valueToSend);
        })
    }
}
    
//Affiche le tableau des produits présent dans la commande
function showOrder(orderList, cat, id, personnalisation){
    let table = document.getElementById('panier__list-items--table');
    html +=  "<tr>" +
                    "<td><a href='product.html?id=" + id + "&cat="+ cat +"''>" + orderList.name + "</a></td>" +
                    "<td>" + personnalisation + "</td>" +
                    "<td ><span class='price'>" + (orderList.price / 100).toFixed(2) + "<span>€</td>" +
                "</tr>";
    table.innerHTML = html;
}

//Calcul la somme total des produits présent dans la commande, return le prix
function calculSum(){
    setTimeout (function(){
        let itemPrice = document.getElementsByClassName('price');
        let totalPrices = parseFloat(0);
        for (var i in itemPrice){
            if (itemPrice[i].textContent){
                totalPrices += parseFloat(itemPrice[i].textContent);
            }
        }
        document.getElementById('total').innerHTML = "TOTAL : " + totalPrices.toFixed(2)+ "€";
        console.log(myproduct);
        return totalPrices;
    }, 600);
}

//Envoie du formulaire et de la commande
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


