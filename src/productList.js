import { getData } from './getDb';
import { cartCount } from './cartCount';
import { getCategorie } from './getIds';

let categorie = window.location.search.replace("?", "");

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




cartCount();
getData('http://localhost:3000/api/' + categorie).then(res => productList(res));