import { loadHeaderFooter } from './include/loadHeaderFooter';

let price = parseFloat(0);

loadHeaderFooter();

if (localStorage.orderRecap){
    let content = JSON.parse(localStorage.orderRecap);
    console.log(content);
    for (var i in content.products){
        price += content.products[i].price;
    }
    document.getElementById('userName').innerHTML = content.contact.firstName + ",";
    document.getElementById('order-email').innerHTML = content.contact.email;
    document.getElementById('order-id').innerHTML = content.orderId;
    document.getElementById('order-userName').innerHTML = content.contact.lastName + " " + content.contact.firstName;
    document.getElementById('order-address').innerHTML = content.contact.address + ", " + content.contact.city;
    document.getElementById('order-total-price').innerHTML = (price / 100).toFixed(2) + "€";
    delete localStorage.orderList;
}else{
    window.location.href = 'order.html';
}