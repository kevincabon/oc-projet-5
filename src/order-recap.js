console.log(JSON.parse(localStorage.orderRecap));
let content = JSON.parse(localStorage.orderRecap);
document.getElementById('order-recap').innerHTML = content.contact.email;