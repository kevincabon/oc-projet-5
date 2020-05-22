import { getData } from './import/getDb';
import { getIds } from './import/getIds';
import { loadHeaderFooter } from './include/loadHeaderFooter';

loadHeaderFooter();

let ids = getIds();
let orderArray = [];

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



let showProductInfos = (data) => {
    let container = document.getElementById('container');
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
                "<img src='"+data.imageUrl+"' class='col-12'>" +
                "<p>" + data.description + "</p>" +
                "Personnalisation : <select id='personalisation'>" + personalisation + "</select>";
    container.innerHTML = html;
    document.getElementById('price').innerHTML = data.price + " $";
}
