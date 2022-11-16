/*
MISCELLANEOUS
This script hides or shows the filter window on click
When clicking on filter button, the filter window appears
Then, clicking on the areas outside the filter window, the window closes
*/

const filterOverlayEl = document.querySelector("#filter-overlay");
const filterWindowEl = document.querySelector("#filter-window");
const filterButtonEl = document.querySelector("#filter-popup-button");

// Filter window pops up when clicking on the button
filterButtonEl.addEventListener("click", ( ) => {
  filterOverlayEl.style.display = "block";
  filterWindowEl.style.display = "flex";
  setTimeout( ( ) => {
    filterOverlayEl.style.opacity = 0.8;
    filterWindowEl.style.opacity = 1;
  }, 50);

});

// Window disappears when clicking outside of window
filterOverlayEl.addEventListener("click", ( ) => {
  filterOverlayEl.style.opacity = 0;
  filterWindowEl.style.opacity = 0;
  setTimeout( () => {
    filterOverlayEl.style.display = "none";
    filterWindowEl.style.display = "none";
  }, 500);

});