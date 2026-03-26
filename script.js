

let movies = JSON.parse(localStorage.getItem("movies")) || [
  { id: 1, title: "Inception", genre: "Sci-Fi", status: "Watched" },
  { id: 2, title: "Interstellar", genre: "Sci-Fi", status: "Watched" },
  { id: 3, title: "The Dark Knight", genre: "Action", status: "Plan to Watch" }
];

function saveMovies() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

function loadMovies() {
  const tableBody = document.getElementById("movie-table-body");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  movies.forEach(movie => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${movie.id}</td>
      <td>${movie.title}</td>
      <td>${movie.genre}</td>
      <td>${movie.status}</td>
    `;
    tableBody.appendChild(row);
  });
}

const movieForm = document.getElementById("movie-form");

if (movieForm) {
  movieForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const status = document.getElementById("status").value;

    const newMovie = {
      id: movies.length ? movies[movies.length - 1].id + 1 : 1,
      title,
      genre,
      status
    };

    movies.push(newMovie);
    saveMovies();

    document.getElementById("message").textContent = "Record has been saved.";
    movieForm.reset();
  });
}

loadMovies();