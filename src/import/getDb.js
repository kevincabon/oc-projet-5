import { Error } from "mongoose";

// Récupère les données dans la base de donnée
let getData = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => resolve(JSON.parse(xhr.responseText)); // Retourne le résultat
        xhr.onerror = () => reject("Error getData"); // Retourne une erreur si un problème est survenu
        xhr.send();
      });
}

export { getData };