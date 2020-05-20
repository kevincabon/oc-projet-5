import { getData } from './getDb';
import { showProductInfos } from './productInfos';
import { getIds } from './getIds';
import { cartCount } from './cartCount';

let ids = getIds();
let orderArray = [];
cartCount();
getData('http://localhost:3000/api/' + ids.categorie + '/' + ids.product_id).then(res => showProductInfos(res));

//console.log(ids.pr<oduct_id)
//delete localStorage.orderList;

document.getElementById('addToOrder').addEventListener('click', function(event){
    //event.preventDefault();
    if(localStorage.getItem('orderList')){
        orderArray = localStorage.getItem('orderList').split(',');
    }
    orderArray.push(ids.categorie+"::"+ids.product_id+"::"+document.getElementById('personalisation').value);
    localStorage.setItem('orderList', orderArray);
    console.log(localStorage.getItem('orderList'));
    console.log(orderArray);
})
console.log(localStorage.getItem('orderList'));