const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');
const searchResults = document.querySelector('#searchResults');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    searchMovies(searchTerm);
  }
});

const apiKey = "6958947b" // Replace with your actual API key
function searchMovies(query) {
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&api_key=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayMovies(data.Search);
    })
    .catch(err => {
      console.error("API errorL", err);
      resultsContainer.innerHTML = "<p class='text-red-500'>Something went wrong. Try again!</p>";
    });
}

function displayMovies(movies) {
  if (!movies) {
    resultsContainer.innerHTML = "<p class='text-gray-500'>No results found.</p>";
    return;
  }

  resultsContainer.innerHTML = "";
  movies.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.className = "bg-white rounded shadow p-4 text-left";

    movieCard.innerHTML = `
      <h2 class="text-xl font-semibold">${movie.Title}</h2>
      <p><strong>Year:</strong> ${movie.Year}</p>
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}" alt="${movie.Title} poster" class="max-w-xs mt-2">
    `;

    resultsContainer.appendChild(movieCard);
  })
}