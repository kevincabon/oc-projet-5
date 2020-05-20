let cartCount = () => {
    if (localStorage.orderList){
        let number = localStorage.orderList.split(',');
        document.getElementById('cart-number').innerText = number.length;
        console.log(number.length);
    }
}

export { cartCount };