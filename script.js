/* Code for all Pages */
/* Gets the Movies from Local Storage */

let movies = JSON.parse(localStorage.getItem("movies")) || [
  { id: 1, title: "Inception", genre: "Sci-Fi", status: "Watched" },
  { id: 2, title: "Interstellar", genre: "Sci-Fi", status: "Watched" }
];


/* Saves the Movies */

function save() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

/* View Data Page */
/* Views the Page and Shows Data */

const table = document.getElementById("movie-table-body");

if (table) {
  showMovies();
}

function showMovies() {
  table.innerHTML = "";

  movies.forEach(m => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${m.id}</td>
      <td>${m.title}</td>
      <td>${m.genre}</td>
      <td>${m.status}</td>
      <td><button class="delete-btn" onclick="deleteMovie(${m.id})">Delete</button></td>
    `;

    table.appendChild(row);
  });
}

/* Function that Deletes the Movie with a Click of the Button */

function deleteMovie(id) {
  movies = movies.filter(m => m.id !== id);
  save();
  showMovies();
}


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

const select = document.getElementById("movie-select");

if (select) {
  /* Fill Dropdown */
  movies.forEach(m => {
    const option = document.createElement("option");
    option.value = m.id;
    option.textContent = m.title;
    select.appendChild(option);
  });

  /* Auto Fills in the Form*/
  select.addEventListener("change", () => {
    const movie = movies.find(m => m.id == select.value);

    if (movie) {
      document.getElementById("edit-title").value = movie.title;
      document.getElementById("edit-genre").value = movie.genre;
      document.getElementById("edit-status").value = movie.status;
    }
  });
}

/* Edit Movies Page */
/* Edits and Updates the Page */

const editForm = document.getElementById("edit-form");

if (editForm) {
  editForm.addEventListener("submit", e => {
    e.preventDefault();

    const movie = movies.find(m => m.id == select.value);

    if (movie) {
      movie.title = document.getElementById("edit-title").value;
      movie.genre = document.getElementById("edit-genre").value;
      movie.status = document.getElementById("edit-status").value;

      save();
      document.getElementById("edit-message").textContent = "Updated!";
    }
  });
}
