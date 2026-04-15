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

/* Views Movies Connected to APi Endpoint */

const API_URL = "https://movie-watchlist-api-7252.onrender.com/api/v1/movies";


async function loadMovies() {
  try {
    /* Await Fetch gets the movies database from the api
       Await response Waits until the API database gives a response*/

    const response = await fetch(API_URL);
    const movies = await response.json();

    /* If the view.html page has a body table and the ID, put
       the table data into the body section. */

    const tableBody = document.getElementById("movie-table-body");
    if (!tableBody) return;

    /* Clears the tableBody so that it doesn't duplicate any rows */  

    tableBody.innerHTML = "";

    /* This loops through each movie in the database and creates
    one table row for each one. */

    movies.forEach((movie) => {
      const row = document.createElement("tr");

      /* This fills the rows with the movies values from the
      api database */

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

/* LoadMovies runs every time the page loads and it gets all the
movies and shows them. */

loadMovies();

/* Adds Movies Conected to the API Endpoint */
const addMovieForm = document.getElementById("movie-form");

/* If the form exists, listen for a submit event.
when the button is clicked, run this code. Prevent
Defaults stops the browser from reloading the page normally. */

if (addMovieForm) {
  addMovieForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    /* Collects the values from the form fields */

    const newMovie = {
      title: document.getElementById("title").value,
      release_year: parseInt(document.getElementById("release_year").value),
      status: document.getElementById("status").value,
      rating: parseInt(document.getElementById("rating").value),
      is_favorite: document.getElementById("is_favorite").checked
    };

    /* Sends the new movie that's added to the backend database */

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newMovie)
      });

      /* Checks to see if the request worked */

      if (!response.ok) {
        throw new Error("Failed to save movie");
      }

      /* Shows a success if it works, shows an error if it
      doesn't. */

      alert("Record has been saved.");
      addMovieForm.reset();
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Error saving movie.");
    }
  });
}

/* Edits Movies Connected to the API Endpoint */

/* movieSelect selects the dropdown list, 
  editForm gets the edit form,
  allMovies stores the movies into memory so it can pull
  from that table.*/

const movieSelect = document.getElementById("movie-select");
const editForm = document.getElementById("edit-form");

let allMovies = [];

/* If the dropdown isn't on the page, stop the function */

async function loadMovieDropdown() {
  if (!movieSelect) return;

  /* This gathers the movies from the api database and puts them
  in the allMovies table. */

  try {
    const response = await fetch(API_URL);
    allMovies = await response.json();

    /* Creates the default dropdown option */

    movieSelect.innerHTML = `<option value="">Select a movie</option>`;

    /* This will add every movie as an option to select in the
    dropdown when clicked on. */

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

/* If the dropdown is selected, get the id and get the
movie that matches the id. */

if (movieSelect) {
  loadMovieDropdown();

  movieSelect.addEventListener("change", () => {
    const selectedId = parseInt(movieSelect.value);
    const movie = allMovies.find((m) => m.id === selectedId);

    if (!movie) return;

    /* Auto fills the form with the current values that already exist. */

    document.getElementById("edit-title").value = movie.title;
    document.getElementById("edit-release_year").value = movie.release_year;
    document.getElementById("edit-status").value = movie.status;
    document.getElementById("edit-rating").value = movie.rating;
    document.getElementById("edit-is_favorite").checked = movie.is_favorite;
  });
}

/* Updates the View page and table when something is changed. */

if (editForm) {
  editForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    /* Selectes the movie the user chooses from the
    dropdown box. */

    const selectedId = movieSelect.value;

    /* This is the edited information the user
    changes that the page updates with. */

    const updatedMovie = {
      title: document.getElementById("edit-title").value,
      release_year: parseInt(document.getElementById("edit-release_year").value),
      status: document.getElementById("edit-status").value,
      rating: parseInt(document.getElementById("edit-rating").value),
      is_favorite: document.getElementById("edit-is_favorite").checked
    };

    /* The updated information is selected into the 
    movie with that specific id. */

    try {
      const response = await fetch(`${API_URL}/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedMovie)
      });

      /* Checks to see if the function worked. */

      if (!response.ok) {
        throw new Error("Failed to update movie");
      }

      /* Shows that the record has been updated, if
      not it fails. */

      alert("Record has been updated.");
      loadMovieDropdown();
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("Error updating movie.");
    }
  });
}

/* Sends a delete request to a specific movie id */

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