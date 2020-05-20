import { cartCount } from './cartCount';

// import getData from './getDb';
// import getCategorie from './getCategories';
// import productList from './productList';
// import displayData from './productInfos';

// if (window.location.search){
//     if (!getCategorie()){
//         document.getElementsByTagName('article')[0].innerHTML = "<h3 class='text-center mt-5'>Erreur, page introuvable<h3>";
//         //throw new Error('Page Introuvable');
//     }
//     if (getCategorie()[0][0] === "categorie"){
//         getData('http://localhost:3000/api/' + getCategorie()[0][1]).then(res => productList(res));
//     }else if (getCategorie()[0][0] === "id" && getCategorie()[1][0] === "cat"){
//         getData('http://localhost:3000/api/' + getCategorie()[1][1] + '/' + getCategorie()[0][1]).then(res => displayData(res));
//     }else{
//     }
// }

// if (document.getElementById('addToOrder')){
//     document.getElementById('addToOrder').setAttribute('href', 'order.html?id=' + getCategorie()[0][1]);
// }

// localStorage.setItem('test', 1);

cartCount();