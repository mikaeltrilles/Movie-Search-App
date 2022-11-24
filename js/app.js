// TMDB
const API_KEY = 'api_key=59463c8e33e49fd47140cadd93773d09'; // API key
const LANG = '&language=fr-FR';
const BASE_URL = 'https://api.themoviedb.org/3';  // Base URL pour les requêtes
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + LANG; // URL pour les films populaires
const IMG_URL = 'https://image.tmdb.org/t/p/w500'; // URL pour les images
const searchURL = BASE_URL + '/search/movie?' + API_KEY + LANG; // URL pour la recherche

const main = document.getElementById('main'); // Récupère l'élément main
const form = document.getElementById('form'); // Récupère l'élément form
const search = document.getElementById('search'); // Récupère l'élément search

getMovies(API_URL); // Appel de la fonction getMovies

function getMovies(url) {
  fetch(url).then(res => res.json()).then(data => {
    console.log(data.results)
    if (data.results.length !== 0) {
      showMovies(data.results);
    } else {
      main.innerHTML = `<h1 class="no-results">Pas de résultat 😢</h1>`
    }

  })

}


function showMovies(data) {
  main.innerHTML = '';

  data.forEach(movie => {
    const { original_title, poster_path, vote_average, overview, id } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
          <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${original_title}">

          <div class="movie-info">
            <h3>${original_title}</h3>
              <span class="${getColor(vote_average)}">${vote_average}</span>
          </div>

          <div class="overview">

              <h3>Synopsis</h3>
              ${overview}
              </div>
      
      `

    main.appendChild(movieEl);

    
  })
}


function getColor(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return "orange"
  } else {
    return 'red'
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if(searchTerm) {
      getMovies(searchURL+'&query='+searchTerm)
  }else{
      getMovies(API_URL);
  }

})