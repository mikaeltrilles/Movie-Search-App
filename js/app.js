// TMDB
const API_KEY = 'api_key=59463c8e33e49fd47140cadd93773d09'; // API key
const LANG = '&language=fr-FR';
const BASE_URL = 'https://api.themoviedb.org/3';  // Base URL pour les requêtes
const BASE_URL_MOVIE = 'https://www.themoviedb.org/movie/';  // Base URL pour les films
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + LANG; // URL pour les films populaires
const IMG_URL = 'https://image.tmdb.org/t/p/w500'; // URL pour les images
const searchURL = BASE_URL + '/search/movie?' + API_KEY + LANG; // URL pour la recherche

const genres = [
  {
    "id": 28,
    "name": "💪&nbspAction"
  },
  {
    "id": 12,
    "name": "🌋&nbspAventure"
  },
  {
    "id": 16,
    "name": "🐵&nbspAnimation"
  },
  {
    "id": 35,
    "name": "😂&nbspComédie"
  },
  {
    "id": 80,
    "name": "🔪&nbspCrime"
  },
  {
    "id": 99,
    "name": "🌍&nbspDocumentaire"
  },
  {
    "id": 18,
    "name": "🎭&nbspDrame"
  },
  {
    "id": 10751,
    "name": "👨‍👩‍👦‍👦&nbspFamilial"
  },
  {
    "id": 14,
    "name": "🦄&nbspFantastique"
  },
  {
    "id": 36,
    "name": "👑&nbspHistoire"
  },
  {
    "id": 27,
    "name": "😱&nbspHorreur"
  },
  {
    "id": 10402,
    "name": "🎸&nbspMusical"
  },
  {
    "id": 9648,
    "name": "🧙🏻‍♂️&nbspMystère"
  },
  {
    "id": 10749,
    "name": "💕&nbspRomance"
  },
  {
    "id": 878,
    "name": "🤖&nbspSciFi"
  },
  {
    "id": 10770,
    "name": "📺&nbspTéléfilm"
  },
  {
    "id": 53,
    "name": "🕵🏻‍♂️&nbspThriller"
  },
  {
    "id": 10752,
    "name": "💣&nbspGuerre"
  },
  {
    "id": 37,
    "name": "🌵&nbspWestern"
  }
]

const main = document.getElementById('main'); // Récupère l'élément main
const form = document.getElementById('form'); // Récupère l'élément form
const search = document.getElementById('search'); // Récupère l'élément search

getMovies(API_URL); // Appel de la fonction getMovies

function getMovies(url) { // Fonction pour récupérer les films
  fetch(url).then(res => res.json()).then(data => { // Récupère les données
    console.log(data.results) // Affiche les données dans la console
    if (data.results.length !== 0) {  // Si les données ne sont pas vides
      showMovies(data.results); // Appel de la fonction showMovies
    } else {  // Sinon affiche un message d'erreur
      main.innerHTML = `<h1 class="no-results">Pas de résultat trouvé 😢</h1>`
    }
  })
}

function showMovies(data) { // Fonction pour afficher les films
  main.innerHTML = '';  // Vide le contenu de l'élément main
  const movieGenres = [];
  data.forEach(movie => { // Pour chaque film
    const { original_title, poster_path, vote_average, overview, id } = movie;  // Récupère les données 
    //Pour chaque film, je crée un  tableau avec en index l'id du film et en valeur un tableau avec la correespondance entre l'id du genre et le nom du genre grace au tableau genres 
    movie.genre_ids.forEach(genre => {
      movieGenres[id] = movieGenres[id] || [];
      movieGenres[id].push(genres.find(g => g.id === genre).name);
    });
    console.log(movieGenres);
    const movieEl = document.createElement('div');  // Crée un élément div
    movieEl.classList.add('movie'); //  Ajoute la classe movie à l'élément movieEl
    // Modifie l'html
    movieEl.innerHTML = `
    <img src="${poster_path ? IMG_URL + poster_path : "https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"}" alt="${original_title}">
          <div class="movie-info">
            <h3>${original_title}</h3>
              <span class="${getColor(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
          <!-- Affiche toutes les valeurs du tableau movieGenres en fonction de l'id du film grace au join du tableau -->
          <div>
          <h3 class="tagRo">Genres</h3>
          <p class="tag">${movieGenres[id].join(' • ')}</p>
          </div>
          <h3 class="tagRo">Synopsis</h3>
          <p>${overview.split(' ', 40).join(' ')}...</p>
              <a class="vigBtn" href='${BASE_URL_MOVIE}${id}${LANG}' target="_blank">Voir fiche</a>
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
  if (searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm)
  } else {
    getMovies(API_URL);
  }
})