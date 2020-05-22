import { Error } from "mongoose";

let getData = (url) => {
    let request = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
                //console.log(response);
                resolve(JSON.parse(this.responseText));
                //reject(console.error('Error'));
            }
        }
        request.open('GET', url);
        request.send();
    })
}

export { getData };