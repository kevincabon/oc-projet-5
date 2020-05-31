import { Error } from "mongoose";

let getData = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject("Error getData");
        xhr.send();
      });
}

export { getData };