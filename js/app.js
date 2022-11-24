⁡⁢⁢⁢/** Créer une application web qui permet de chercher des informations sur un film via une API.
Pour cela, nous allons utiliser une API : http://www.omdbapi.com/
Clé API : f6e256e1
Exemple d’URL de recherche : https://www.omdbapi.com/?s=batman&apikey=f6e256e1
Nous allons aussi utiliser la méthode fetch de JS.
*/⁡

// Recupere le film
const input = document.querySelector('input');
const button = document.querySelector('button');

button.addEventListener('click', function () {
  const value = input.value;
  console.log(value);
  const url = `https://www.omdbapi.com/?s=${value}&apikey=f6e256e1`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}
);
