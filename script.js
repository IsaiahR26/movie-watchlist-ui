/* Code for all Pages */
/* Gets the Movies from Local Storage */


// Old Local Storage Version 

//let movies = JSON.parse(localStorage.getItem("movies")) || [
//  { id: 1, title: "Inception", genre: "Sci-Fi", status: "Watched" },
//  { id: 2, title: "Interstellar", genre: "Sci-Fi", status: "Watched" }
//];


/* Saves the Movies */

//function save() {
//  localStorage.setItem("movies", JSON.stringify(movies));
//}

/* View Data Page */
/* Views the Page and Shows Data */

//const table = document.getElementById("movie-table-body");

//if (table) {
//  showMovies();
//}

//function showMovies() {
//  table.innerHTML = "";

//  movies.forEach(m => {
//    const row = document.createElement("tr");

//    row.innerHTML = `
//      <td>${m.id}</td>
//      <td>${m.title}</td>
//      <td>${m.genre}</td>
//      <td>${m.status}</td>
//      <td><button class="delete-btn" onclick="deleteMovie(${m.id})">Delete</button></td>
//    `;

//    table.appendChild(row);
//  });
//}

/* Function that Deletes the Movie with a Click of the Button */

//function deleteMovie(id) {
//  movies = movies.filter(m => m.id !== id);
//  save();
//  showMovies();
//}



/* Add New Movie Page */
/* Adds the Page with the Form Submit */

const addForm = document.getElementById("movie-form");

/* e Variable Represents the Submit Event Triggered by the Form */

if (addForm) {
  addForm.addEventListener("submit", e => {
    e.preventDefault();

    const newMovie = {
      id: movies.length + 1,
      title: document.getElementById("title").value,
      genre: document.getElementById("genre").value,
      status: document.getElementById("status").value
    };

    movies.push(newMovie);
    save();

    document.getElementById("message").textContent = "Saved!";
    addForm.reset();
  });
}

/* Edit Movies Page */
/* Edits the Page with Dropdown */

//  const select = document.getElementById("movie-select");

//if (select) {
//  /* Fill Dropdown */
// movies.forEach(m => {
//    const option = document.createElement("option");
//    option.value = m.id;
//    option.textContent = m.title;
//    select.appendChild(option);
//  });
//
//  /* Auto Fills in the Form*/
//  select.addEventListener("change", () => {
//    const movie = movies.find(m => m.id == select.value);
//
//    if (movie) {
//      document.getElementById("edit-title").value = movie.title;
//      document.getElementById("edit-genre").value = movie.genre;
//     document.getElementById("edit-status").value = movie.status;
//    }
//  });
//} 



/* Views Movies Connected to APi Endpoint */

const API_URL = "https://movie-watchlist-api-7252.onrender.com/api/v1/movies";


async function loadMovies() {
  try {
    const response = await fetch(API_URL);
    const movies = await response.json();

    const tableBody = document.getElementById("movie-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    movies.forEach((movie) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${movie.id}</td>
        <td>${movie.title}</td>
        <td>${movie.release_year}</td>
        <td>${movie.status}</td>
        <td>${movie.rating}</td>
        <td>${movie.is_favorite ? "Yes" : "No"}</td>
        <td><button onclick="deleteMovie(${movie.id})">Delete</button></td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading movies:", error);
  }
}

loadMovies();

/* Adds Movies Conected to the API Endpoint */
const addMovieForm = document.getElementById("movie-form");

if (addMovieForm) {
  addMovieForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newMovie = {
      title: document.getElementById("title").value,
      release_year: parseInt(document.getElementById("release_year").value),
      status: document.getElementById("status").value,
      rating: parseInt(document.getElementById("rating").value),
      is_favorite: document.getElementById("is_favorite").checked
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newMovie)
      });

      if (!response.ok) {
        throw new Error("Failed to save movie");
      }

      alert("Record has been saved.");
      addMovieForm.reset();
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Error saving movie.");
    }
  });
}

/* Edits Movies Connected to the API Endpoint */


const movieSelect = document.getElementById("movie-select");
const editForm = document.getElementById("edit-form");

let allMovies = [];

async function loadMovieDropdown() {
  if (!movieSelect) return;

  try {
    const response = await fetch(API_URL);
    allMovies = await response.json();

    movieSelect.innerHTML = `<option value="">Select a movie</option>`;

    allMovies.forEach((movie) => {
      const option = document.createElement("option");
      option.value = movie.id;
      option.textContent = movie.title;
      movieSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading dropdown:", error);
  }
}

if (movieSelect) {
  loadMovieDropdown();

  movieSelect.addEventListener("change", () => {
    const selectedId = parseInt(movieSelect.value);
    const movie = allMovies.find((m) => m.id === selectedId);

    if (!movie) return;

    document.getElementById("edit-title").value = movie.title;
    document.getElementById("edit-release_year").value = movie.release_year;
    document.getElementById("edit-status").value = movie.status;
    document.getElementById("edit-rating").value = movie.rating;
    document.getElementById("edit-is_favorite").checked = movie.is_favorite;
  });
}

if (editForm) {
  editForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const selectedId = movieSelect.value;

    const updatedMovie = {
      title: document.getElementById("edit-title").value,
      release_year: parseInt(document.getElementById("edit-release_year").value),
      status: document.getElementById("edit-status").value,
      rating: parseInt(document.getElementById("edit-rating").value),
      is_favorite: document.getElementById("edit-is_favorite").checked
    };

    try {
      const response = await fetch(`${API_URL}/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedMovie)
      });

      if (!response.ok) {
        throw new Error("Failed to update movie");
      }

      alert("Record has been updated.");
      loadMovieDropdown();
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("Error updating movie.");
    }
  });
}

async function deleteMovie(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    alert("Movie deleted!");
    loadMovies();

  } catch (error) {
    console.error("Error deleting movie:", error);
    alert("Error deleting movie.");
  }
}