const form = document.querySelector("#searchForm");
form.addEventListener("submit", async e => {
    e.preventDefault();
    // createColumns([1, 2, 3, 4]);
    deleteShows();
    const searchedMovie = form.elements.query.value;
    if (searchedMovie != "") {
        const config = { params: { q: searchedMovie } };
        const searchResult = await axios.get(`https://api.tvmaze.com/search/shows`, config);
        // makeImages(searchResult.data);
        createColumns(searchResult.data);
    }
})

const deleteShows = () => {
    const currentShows = document.querySelectorAll(".columns");
    for (show of currentShows) {
        show.remove();
    }
}


const createColumns = (shows) => {
    const movieContainer = document.querySelector("#movieContainer");
    let numOfRows = Math.ceil(shows.length / 3);
    let columns = [];
    let showsIndex = 0;
    //creating columns
    for (let i = 0; i < numOfRows; i++) {
        let newColumn = document.createElement("div");
        newColumn.classList.add("columns", "is-desktop");
        columns.push(newColumn);
    }
    for (let col of columns) {
        movieContainer.append(col);
        for (let i = 0; i < 3; i++) {
            if (shows[showsIndex].show.image) {
                let newColumn = document.createElement("div");
                newColumn.classList.add("column", "is-12-tablet", "is-4-desktop");
                col.append(newColumn);

                let newCard = document.createElement("div");
                newCard.classList.add("card", "card-equal-height");
                newColumn.append(newCard);

                //card image
                let newCardImage = document.createElement("div");
                newCardImage.classList.add("card-image");
                newCard.append(newCardImage);

                let newFigure = document.createElement("figure");
                newFigure.classList.add("image", "is-4by3");
                newCardImage.append(newFigure);

                let newImage = document.createElement("img");
                newImage.src = shows[showsIndex].show.image.original;
                newFigure.append(newImage);

                //card content
                let newCardContent = document.createElement("div");
                newCardContent.classList.add("card-content");
                newCard.append(newCardContent);

                let newContent = document.createElement("div");
                newContent.classList.add("content");
                newCardContent.append(newContent);

                let newMovieName = document.createElement("h2");
                newMovieName.classList.add("has-text-centered", "title", "is-3");
                newMovieName.textContent = shows[showsIndex].show.name;
                newContent.append(newMovieName);

                console.dir(shows[showsIndex]);
                let newMovieRating = document.createElement("h4");
                newMovieRating.textContent = "Score: ";

                let newSpan = document.createElement("span");
                newSpan.textContent = shows[showsIndex].score.toFixed(1);
                if (shows[showsIndex].score.toFixed(1) >= 10) {
                    newSpan.classList.add("has-text-success");
                }
                else if (shows[showsIndex].score.toFixed(1) >= 5) {
                    newSpan.classList.add("has-text-warning");
                }
                else {
                    newSpan.classList.add("has-text-danger");
                }
                newMovieRating.append(newSpan);

                newContent.append(newMovieRating);

                let newMovieInfo = document.createElement("p");
                newMovieInfo.innerHTML = shows[showsIndex].show.summary;
                newContent.append(newMovieInfo);


                //card footer
                let newFooter = document.createElement("footer");
                newFooter.classList.add("card-footer");
                newCard.append(newFooter);

                let newViewLink = document.createElement("a");
                newViewLink.setAttribute("href", shows[showsIndex].show.url);
                newViewLink.classList.add("card-footer-item");
                newViewLink.textContent = "VIEW";
                newFooter.append(newViewLink);
            }
            else {
                i--;
            }
            showsIndex++;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });