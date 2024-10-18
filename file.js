// Your API key from TMDb
const apiKey = '1402bf9d9f9d8dc93313a92378804e1d'; 

// URL to fetch trending movies
const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

function fetchTrendingMovies() {
  fetch(trendingMoviesUrl)
    .then(function(response) {
    
      return response.json();
    })
    .then(function(data) {

      const movies = data.results;
      const moviesContainer = document.getElementById('trending-movies');
      
      moviesContainer.innerHTML = '';

      movies.forEach(function(movie) {
        const movieElement = document.createElement('div');
        movieElement.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <button onclick="addToWatchlist(${movie.id}, '${movie.title}')">Add to Watchlist</button>
        `;
        moviesContainer.appendChild(movieElement);
      });
    })
    .catch(function(error) {
      console.error('Error fetching movies:', error);
    });
}

function searchMovies() {
  const searchInput = document.getElementById('search-bar').value;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`;

  fetch(searchUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const searchResults = data.results;
      const searchSuggestions = document.getElementById('search-suggestions');

      searchSuggestions.innerHTML = '';

      searchResults.forEach(function(movie) {
        const suggestionItem = document.createElement('li');
        suggestionItem.innerText = movie.title;
        searchSuggestions.appendChild(suggestionItem);
      });
    })
    .catch(function(error) {
      console.error('Error searching movies:', error);
    });
}

let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

function addToWatchlist(movieId, title) {
  const movie = { id: movieId, title };
  watchlist.push(movie);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  displayWatchlist();
}

function displayWatchlist() {
  const watchlistContainer = document.getElementById('watchlist');
  
  watchlistContainer.innerHTML = '';

  watchlist.forEach(function(movie) {
    const movieItem = document.createElement('div');
    movieItem.innerHTML = `
      <h3>${movie.title}</h3>
      <button onclick="removeFromWatchlist(${movie.id})">Remove</button>
    `;
    watchlistContainer.appendChild(movieItem);
  });
}

function removeFromWatchlist(movieId) {
  watchlist = watchlist.filter(function(movie) {
    return movie.id !== movieId;
  });
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  displayWatchlist();
}

fetchTrendingMovies();

displayWatchlist();
