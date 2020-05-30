import { getData } from './import/getDb';
import { getIds } from './import/getIds';
import { loadHeaderFooter } from './include/loadHeaderFooter';
import { cartCount } from './include/loadHeaderFooter';

loadHeaderFooter();

let ids = getIds();
let orderArray = [];
let recentAddCart = '';

getData('http://localhost:3000/api/' + ids.category + '/' + ids.product_id).then(res => recentAddCart = showProductInfos(res));

//delete localStorage.orderList;

if (ids.category != "teddies"){
    document.getElementById('btn-addToOrder').setAttribute('disabled', '');
    document.getElementById('btn-addToOrder').innerText = 'Produit Non Dispo';
}

document.getElementById('btn-addToOrder').addEventListener('click', function(event){
    //event.preventDefault();
    if(localStorage.getItem('orderList')){
        orderArray = localStorage.getItem('orderList').split(',');
    }
    orderArray.push(ids.category+"::"+ids.product_id+"::"+document.getElementById('personalisation').value);
    localStorage.setItem('orderList', orderArray);
    localStorage.setItem('recentAddCart', recentAddCart.name + "&" + recentAddCart.img);
    window.location.href = "category.html?" + ids.category;
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
    let price = (data.price) / 100;
    document.getElementById('price').innerHTML = price.toFixed(2) + "€";
    return {'name':data.name, 'img':data.imageUrl};
}
