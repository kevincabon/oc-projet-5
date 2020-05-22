import { cartCount } from './cartCount';

let loadHeaderFooter = () => {
    $('header').load('/pages/header.html');

    setTimeout(function(){
        cartCount()
    }, 150)
}

export { loadHeaderFooter };