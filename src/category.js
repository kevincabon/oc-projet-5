import { getData } from './import/getDb';
import { loadHeaderFooter } from './include/loadHeaderFooter';
import { Error } from 'mongoose';

loadHeaderFooter(); //Affiche le header et le footer de la page
showRecentAddCart(); 

class StockStatus {
    constructor(category, status) {
        this.category = category;
        this.status = status;
    }
}

let category = window.location.search.replace("?", ""); // Selectionne la catégorie qui est dans l'url de la page
let stockStatus = Array(new StockStatus("teddies", "ok"),
                        new StockStatus("cameras", "out"),
                        new StockStatus("furniture", "out")); // variable qui détermine le status du stock des catégories

//Affiche les produits qui sont présents dans la base de donnée
let productList = (products) => {
    $(".rayon").fadeIn(200);
    let container = document.getElementById('list');
    if (document.getElementById('category-img')) {
        document.getElementById('category-img').setAttribute('src', '/images/' + category + '.png');
    }
    let html = '';
    for (let article of products) {
        html += "<figure>" +
            "<a href='product.html?id=" + article._id + "&cat=" + category + "'>" +
            "<img src='" + article.imageUrl + "' class='shadow'>" +
            "<figcaption>" +
            article.name +
            "</figcaption>" +
            "</a>" +
            "</figure>";
    }
    container.innerHTML = html;
}

//Message d'erreur en cas de probleme de chargement des catégories, nom de catégorie inconnu où base de donnée non joignable
let showError = (message) => {
    $("article").fadeIn(100);
    let container = document.getElementsByTagName('article')[0];
    if (message === 1){
        container.innerHTML = "<h2 class='text-center'>Erreur du chargement des données ...</h2>";
    }else if (message === 2){
        container.innerHTML = "<h2 class='text-center'>Catégorie introuvable ...</h2>";
    }
}

//Affiche un message quand un article viens dêtre ajouter dans la panier
function showRecentAddCart() {
    if (localStorage.recentAddCart) {
        let product = localStorage.recentAddCart.split("&");
        document.getElementById('recent-add-cart').innerHTML = "<tr> "
            + "<td><img src='" + product[1] + "'></td>"
            + "<td class='recent-add-cart__name'><span>" + product[0] + "</span><br><i class='fas fa-check'></i> Ajouté au panier</td> "
            + "<td class='recent-add-cart__button'><a href='cart.html'><button class='btn btn-success btn-cart'>Voir mon panier</button></a></td>"
            + "</tr>";
        delete localStorage.recentAddCart;
    }
}

let displayCategory = () => {
    let categoryFound = false;
    for(let i in stockStatus){
        if (stockStatus[i].category == category){
            //Récupère la liste des produits présent dans la base de donnée
            getData('http://localhost:3000/api/' + category)
                .then(res => {
                    productList(res);
                })
                .catch(error => {
                    showError(1);
                    console.error(error);
                });
            for (let i in stockStatus) {
                //Check si la catégorie selectionné a un stock épuisé ou non, si c'est le cas une image de stock épuisé va s'afficher
                if (category == stockStatus[i].category && stockStatus[i].status == "out") {
                    let stockOutImage = document.createElement("img");
                    stockOutImage.setAttribute("src", "/images/stock-out.png");
                    stockOutImage.setAttribute("class", "stock-out");
                    document.getElementById('cat-logo').appendChild(stockOutImage);
                }
            }
            categoryFound = true;
        }
    }
    if (categoryFound === false){
        showError(2);
    }
}


displayCategory();