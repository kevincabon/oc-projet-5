//Affiche le nombre d'article présent dans le panier
let cartCount = () => {
    if (localStorage.orderList){
        let number = localStorage.orderList.split(',');
        document.getElementById('cart-number').innerText = number.length;
    }
}

let loadHeaderFooter = () => {
    $('header').load('/pages/header.html');
    $('footer').load('/pages/footer.html');

    setTimeout(function(){
        cartCount()
    }, 400)
}

export { loadHeaderFooter };
export { cartCount };