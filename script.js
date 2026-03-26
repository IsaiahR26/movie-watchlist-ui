/* Display Movies in View Data Page */

const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", status: "Watched" },
  { id: 2, title: "Interstellar", genre: "Sci-Fi", status: "Plan to Watch" },
  { id: 3, title: "The Dark Knight", genre: "Action", status: "Watched" }
];

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

loadMovies();

/* Add New Movies */

