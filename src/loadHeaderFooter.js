import { cartCount } from './cartCount';

let loadHeaderFooter = () => {
    $('header').load('/pages/header.html');
    $('footer').load('/pages/footer.html');

    setTimeout(function(){
        cartCount()
    }, 150)
}

export { loadHeaderFooter };