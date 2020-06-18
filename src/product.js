import { getData } from './import/getDb';
import { getIds } from './import/getIds';
import { loadHeaderFooter } from './include/loadHeaderFooter';
import { cartCount } from './include/loadHeaderFooter';

loadHeaderFooter();

let ids = getIds();
let orderArray = [];
let recentAddCart = '';

// Récupère le produit selectionné dans la base de donnée
getData('http://localhost:3000/api/' + ids.category + '/' + ids.product_id)
    .then(res => recentAddCart = showProductInfos(res))
    .catch(error => {
        document.getElementsByTagName('article')[0].innerHTML = "<h2 class='text-center'>Erreur du chargement des données ...</h2>";
        console.error(error);
    });

// Si la catégorie n'est pas teddies, le bouton d'ajout dans le panier est désactivé, car les autres catégories ne sont pas disponible pour le moment
if (ids.category != "teddies"){
    document.getElementById('btn-addToOrder').setAttribute('disabled', '');
    document.getElementById('btn-addToOrder').innerText = 'Produit Non Dispo';
}

// Ajoute un produit dans le panier quand on clic sur le bouton 
document.getElementById('btn-addToOrder').addEventListener('click', function(event){
    if(localStorage.getItem('orderList')){ //Si aucun élément n'est présent dans la panier, on crée la variable
        orderArray = localStorage.getItem('orderList').split(',');
    }
    orderArray.push(ids.category+"::"+ids.product_id+"::"+document.getElementById('personalisation').value); // Sinon on va ajouter à la suite les produits
    localStorage.setItem('orderList', orderArray);
    localStorage.setItem('recentAddCart', recentAddCart.name + "&" + recentAddCart.img); // Crée la variable qui confirme l'ajout récent d'un élément dans la panier
    window.location.href = "category.html?" + ids.category;
})

//Affiche les informations sur le produit
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
