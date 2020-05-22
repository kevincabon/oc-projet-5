let cartCount = () => {
    if (localStorage.orderList){
        let number = localStorage.orderList.split(',');
        document.getElementById('cart-number').innerText = number.length;
        console.log(number.length);
    }
}

let loadHeaderFooter = () => {
    $('header').load('/pages/header.html');
    $('footer').load('/pages/footer.html');

    setTimeout(function(){
        cartCount()
    }, 600)
}

export { loadHeaderFooter };