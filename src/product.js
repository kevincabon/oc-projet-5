import { getData } from './import/getDb';
import { getIds } from './import/getIds';
import { loadHeaderFooter } from './include/loadHeaderFooter';
import { cartCount } from './include/loadHeaderFooter';

loadHeaderFooter();

let ids = getIds();
let orderArray = [];

getData('http://localhost:3000/api/' + ids.categorie + '/' + ids.product_id).then(res => showProductInfos(res));

//delete localStorage.orderList;

if (ids.categorie != "teddies"){
    document.getElementById('btn-addToOrder').setAttribute('disabled', '');
    document.getElementById('btn-addToOrder').innerText = 'Produit Non Dispo';
}

document.getElementById('btn-addToOrder').addEventListener('click', function(event){
    //event.preventDefault();
    if(localStorage.getItem('orderList')){
        orderArray = localStorage.getItem('orderList').split(',');
    }
    orderArray.push(ids.categorie+"::"+ids.product_id+"::"+document.getElementById('personalisation').value);
    localStorage.setItem('orderList', orderArray);
    document.getElementById('sucess-add-cart').innerHTML = "Ajouté au panier ! <br> <a href='order.html'><button class='btn btn-success btn-cart'>Voir mon panier</button></a>";
    $('#sucess-add-cart').fadeIn(350);
    cartCount();
    // console.log(localStorage.getItem('orderList'));
    // console.log(orderArray);
})

let showProductInfos = (data) => {
    let productImage = document.getElementById('product-infos__image');
    let productDetails = document.getElementById('product-infos__details');
    let personalisation = [];
    if (data.varnish){
        var personalisationData = data.varnish;
    }else if (data.colors){
        var personalisationData = data.colors;
    }else if (data.lenses){
        var personalisationData = data.lenses;
    }
    for (let i in personalisationData){
        personalisation += "<option>" + personalisationData[i] + "</option>";
    }
    let html =  "<h2>" + data.name + "</h2>" +
                "<p>" + data.description + "</p>" +
                "Personnalisation : <select id='personalisation'>" + personalisation + "</select>";
    productImage.innerHTML = "<img src='"+data.imageUrl+"' class='col-12'>";
    productDetails.innerHTML = html;
    document.getElementById('price').innerHTML = data.price + " $";
}
