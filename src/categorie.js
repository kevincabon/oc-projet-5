import { getData } from './import/getDb';
import { loadHeaderFooter } from './include/loadHeaderFooter';
import { getCategorie } from './import/getIds';

loadHeaderFooter();
showRecentAddCart();

let categorie = window.location.search.replace("?", "");
getData('http://localhost:3000/api/' + categorie).then(res => productList(res));

let productList = (products) => {
    let container = document.getElementById('list');
    if (document.getElementById('categorie-img')){
        document.getElementById('categorie-img').setAttribute('src', '/images/' + categorie + '.png');
    }
    //console.log(products);
    let html = '';
    for (let article of products){
        html +=     "<figure>" + 
                        "<a href='product.html?id=" + article._id + "&cat="+ categorie +"'>" + 
                            "<img src='"+article.imageUrl+"''>" +
                            "<figcaption>" + 
                            article.name + 
                            "</figcaption>" + 
                        "</a>" +
                    "</figure>";
    }
    container.innerHTML = html;
}

function showRecentAddCart(){
    if(localStorage.recentAddCart){
        let product = localStorage.recentAddCart.split("&");
        document.getElementById('recent-add-cart').innerHTML =  "<tr> "
                                                                    + "<td><img src='"+ product[1] +"'></td>"
                                                                    + "<td class='recent-add-cart__name'><span>"+ product[0] +"</span><br><i class='fas fa-check'></i> Ajouté au panier</td> "
                                                                    + "<td class='recent-add-cart__button'><a href='order.html'><button class='btn btn-success btn-cart'>Voir mon panier</button></a></td>"
                                                                + "</tr>";
        delete localStorage.recentAddCart;
    }
}