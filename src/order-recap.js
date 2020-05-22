import { loadHeaderFooter } from './include/loadHeaderFooter';

let price = 0;

loadHeaderFooter();

if (localStorage.orderRecap){
    let content = JSON.parse(localStorage.orderRecap);
    for (var i in content.products){
        price += content.products[i].price;
    }
    document.getElementById('order-id').innerHTML = content.orderId;
    document.getElementById('order-total-price').innerHTML = price;
    delete localStorage.orderList;
}else{
    window.location.href = 'order.html';
}