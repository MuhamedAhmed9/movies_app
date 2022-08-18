/* start sidebar */
let sidebar = document.querySelector(".sidebar");
let sidebarLis = document.querySelectorAll(".sidebar .nav-items ul li");
let sidebarBtn = document.getElementById("sidebarBtn");
let searchInput = document.getElementById("search");
let searchGenre = document.getElementById("searchGenre");
sidebarBtn.addEventListener("click", function (e) {
  sidebar.classList.toggle("open");
  if (sidebar.classList.contains("open")) {
    e.target.classList.add("fa-times");
    $(".sidebar .nav-items ul li").slideDown(1000);
  } else {
    e.target.classList.remove("fa-times");
  }
});
/* end sidebar */
/* start fetching movies */
let currentPlaylistType = "";
let currentSearchTerm = "";
let currentGenre = "";
async function fetchMovies(playlist_type = null, pageNum = null) {
  //fetching data
  let response;
  if (playlist_type == "trending") {
    response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=ef80a5c8a9404e2d98a00922fdd6774f&page=${
        pageNum || 1
      }`
    );
  } else {
    response = await fetch(
      `https://api.themoviedb.org/3/movie/${
        playlist_type || "now_playing"
      }?api_key=ef80a5c8a9404e2d98a00922fdd6774f&language=en-US&page=${
        pageNum || 1
      }`
    );
  }
  let data = await response.json();
  currentPlaylistType = playlist_type != null ? playlist_type : "now_playing";
  currentSearchTerm = "";
  currentGenre = "";
  if (pageNum == null) {
    apiPagesCreator(data.total_pages);
  }
  displayMovies(data.results);
}
fetchMovies();

async function search(term, pageNum = null) {
  if (term !== "") {
    let response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=ef80a5c8a9404e2d98a00922fdd6774f&language=en-US&query=${term}&page=${
        pageNum || 1
      }&include_adult=true`
    );
    let data = await response.json();
    currentSearchTerm = term;
    currentPlaylistType = "";
    currentGenre = "";
    if (pageNum == null) {
      apiPagesCreator(data.total_pages);
    }
    displayMovies(data.results);
  } else {
    fetchMovies();
  }
}
searchInput.addEventListener("input", function (e) {
  search(e.target.value);
});

async function searchWithGenre(genre, pageNum = null) {
  if (genre != "") {
    let genreid = 0;
    let genres = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=ef80a5c8a9404e2d98a00922fdd6774f&language=en-US`
    );
    let genres_data = await genres.json();
    genres_data.genres.forEach((gen) => {
      if (gen.name.toLowerCase() == genre.toLowerCase()) {
        genreid = gen.id;
      }
    });
    let response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=ef80a5c8a9404e2d98a00922fdd6774f&with_genres=${genreid}&page=${
        pageNum || 1
      }`
    );
    let data = await response.json();
    currentGenre = genre;
    currentPlaylistType = "";
    currentSearchTerm = "";
    if (pageNum == null) {
      apiPagesCreator(data.total_pages);
    }
    displayMovies(data.results);
  } else {
    fetchMovies();
  }
}
searchGenre.addEventListener("input", function (e) {
  searchWithGenre(e.target.value);
});

sidebarLis.forEach(function (li) {
  li.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-value")) {
      fetchMovies(e.target.dataset.value);
    }
  });
});

function displayMovies(data) {
  let dataContainer = "";
  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].poster_path !== undefined && data[i].poster_path !== null) {
        dataContainer += `<div class="col-lg-4 col-md-6">
        <div class="movie-item">
          <img
            src="https://image.tmdb.org/t/p/w500/${data[i].poster_path}"
            class="w-100"
            alt=""
          />
          <div class="layer">
            <h3 class="title">
              ${data[i].original_title}
            </h3>
            <p class="description">
              ${data[i].overview}
            </p>
            <span class="rate">rate: ${data[i].vote_average} (${data[i].vote_count})</span>
            <span class="release-date">release data : ${data[i].release_date}</span>
          </div>
        </div>
        </div>`;
      }
    }
  }
  document.querySelector(".movies-container .content").innerHTML =
    dataContainer;
}
/* end fetching movies */
//-----------------------------------------------------------------------------------
/* start contact us section */
let allInputs = document.querySelectorAll(".contactUs input");
let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let phone = document.getElementById("phone");
let age = document.getElementById("age");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let contactForm = document.querySelector(".contactUs form");

/* on typing */
allInputs.forEach(function (input) {
  let name_regexp = /\w{3,}/;
  let email_regexp = /\w{3,}@\w+\.\w+/;
  let phone_regexp = /^(002 ?)?01[0125]\d{8}$/;
  let age_regexp = /^[1-9][0-9]$/;
  let password_regexp = /[a-zA-Z0-9_]{8,}/;
  input.addEventListener("input", function (e) {
    let elementVal = e.target.value;
    if (e.target.id == "name") {
      if (name_regexp.test(elementVal)) {
        e.target.classList.add("is-valid");
        e.target.classList.remove("is-invalid");
        $(e.target.nextElementSibling).hide(250);
      } else {
        e.target.classList.add("is-invalid");
        e.target.classList.remove("is-valid");
        $(e.target.nextElementSibling).show(250);
      }
    }
    if (e.target.id == "email") {
      if (email_regexp.test(elementVal)) {
        e.target.classList.add("is-valid");
        e.target.classList.remove("is-invalid");
        $(e.target.nextElementSibling).hide(250);
      } else {
        e.target.classList.add("is-invalid");
        e.target.classList.remove("is-valid");
        $(e.target.nextElementSibling).show(250);
      }
    }
    if (e.target.id == "phone") {
      if (phone_regexp.test(elementVal)) {
        e.target.classList.add("is-valid");
        e.target.classList.remove("is-invalid");
        $(e.target.nextElementSibling).hide(250);
      } else {
        e.target.classList.add("is-invalid");
        e.target.classList.remove("is-valid");
        $(e.target.nextElementSibling).show(250);
      }
    }
    if (e.target.id == "age") {
      if (age_regexp.test(elementVal)) {
        e.target.classList.add("is-valid");
        e.target.classList.remove("is-invalid");
        $(e.target.nextElementSibling).hide(250);
      } else {
        e.target.classList.add("is-invalid");
        e.target.classList.remove("is-valid");
        $(e.target.nextElementSibling).show(250);
      }
    }
    if (e.target.id == "password") {
      if (password_regexp.test(elementVal)) {
        e.target.classList.add("is-valid");
        e.target.classList.remove("is-invalid");
        $(e.target.nextElementSibling).hide(250);
      } else {
        e.target.classList.add("is-invalid");
        e.target.classList.remove("is-valid");
        $(e.target.nextElementSibling).show(250);
      }
    }
    if (e.target.id == "confirmPassword") {
      if (e.target.value == password.value && confirmPassword.value !== "") {
        e.target.classList.add("is-valid");
        e.target.classList.remove("is-invalid");
        $(e.target.nextElementSibling).hide(250);
      } else {
        e.target.classList.add("is-invalid");
        e.target.classList.remove("is-valid");
        $(e.target.nextElementSibling).show(250);
      }
    }
  });
});

/* on submit */
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let name_regexp = /\w{3,}/;
  let email_regexp = /\w{3,}@\w+\.\w+/;
  let phone_regexp = /^(002 ?)?01[0125]\d{8}$/;
  let age_regexp = /^[1-9][0-9]$/;
  let password_regexp = /[a-zA-Z0-9_]{8,}/;
  if (userName) {
    if (name_regexp.test(userName.value)) {
      userName.classList.add("is-valid");
      userName.classList.remove("is-invalid");
    } else {
      userName.classList.add("is-invalid");
      userName.classList.remove("is-valid");
      // userName.nextElementSibling.style.setProperty("display", "block");
    }
  }
  if (userEmail) {
    if (email_regexp.test(userEmail.value)) {
      userEmail.classList.add("is-valid");
      userEmail.classList.remove("is-invalid");
    } else {
      userEmail.classList.add("is-invalid");
      userEmail.classList.remove("is-valid");
    }
  }
  if (phone) {
    if (phone_regexp.test(phone.value)) {
      phone.classList.add("is-valid");
      phone.classList.remove("is-invalid");
    } else {
      phone.classList.add("is-invalid");
      phone.classList.remove("is-valid");
    }
  }
  if (age) {
    if (age_regexp.test(age.value)) {
      age.classList.add("is-valid");
      age.classList.remove("is-invalid");
    } else {
      age.classList.add("is-invalid");
      age.classList.remove("is-valid");
    }
  }
  if (password) {
    if (password_regexp.test(password.value)) {
      password.classList.add("is-valid");
      password.classList.remove("is-invalid");
    } else {
      password.classList.add("is-invalid");
      password.classList.remove("is-valid");
    }
  }
  if (confirmPassword) {
    if (
      confirmPassword.value == password.value &&
      confirmPassword.value !== ""
    ) {
      confirmPassword.classList.add("is-valid");
      confirmPassword.classList.remove("is-invalid");
    } else {
      confirmPassword.classList.add("is-invalid");
      confirmPassword.classList.remove("is-valid");
    }
  }
});
/* end contact us section */
/* start pagination section */
let apiPagination = document.getElementById("api-pages");
let nextBtn = document.querySelector(`span[data-val='next']`);
let prevBtn = document.querySelector(`span[data-val='prev']`);

function apiPagesCreator(pagesNum) {
  apiPagination.innerHTML = "";
  if (pagesNum >= 50) {
    for (let i = 1; i <= 50; i++) {
      let pageLink = document.createElement("li");
      pageLink.className = "page-item";
      pageLink.innerHTML = `<span class="page-link">${i}</span>`;
      apiPagination.appendChild(pageLink);
    }
  } else {
    for (let i = 1; i <= pagesNum; i++) {
      let pageLink = document.createElement("li");
      pageLink.className = "page-item";
      pageLink.innerHTML = `<span class="page-link">${i}</span>`;
      apiPagination.appendChild(pageLink);
    }
  }
  if (apiPagination.querySelector("li") != undefined) {
    apiPagination.querySelector("li").classList.add("active");
  }
  pageClicked();
}

function pageClicked() {
  let pagesLinks = document.querySelectorAll("#api-pages .page-item");
  pagesLinks.forEach(function (pageLink) {
    if (currentPlaylistType != "") {
      pageLink.addEventListener("click", (e) => {
        e.preventDefault();
        fetchMovies(currentPlaylistType, e.target.innerHTML);
        pagesLinks.forEach((link) => link.classList.remove("active"));
        e.target.parentElement.classList.add("active");
      });
    } else if (currentSearchTerm != "") {
      pageLink.addEventListener("click", (e) => {
        e.preventDefault();
        search(currentSearchTerm, e.target.innerHTML);
        pagesLinks.forEach((link) => link.classList.remove("active"));
        e.target.parentElement.classList.add("active");
      });
    } else if (currentGenre != "") {
      pageLink.addEventListener("click", (e) => {
        e.preventDefault();
        searchWithGenre(currentGenre, e.target.innerHTML);
        pagesLinks.forEach((link) => link.classList.remove("active"));
        e.target.parentElement.classList.add("active");
      });
    }
  });
}
nextBtn.addEventListener("click", () => {
  let current = document.querySelector(".page-item.active");
  if (current.nextElementSibling != undefined) {
    current.nextElementSibling.children[0].click();
  }
});
prevBtn.addEventListener("click", () => {
  let current = document.querySelector(".page-item.active");
  if (current.previousElementSibling != undefined) {
    current.previousElementSibling.children[0].click();
  }
});
/* end pagination section */
