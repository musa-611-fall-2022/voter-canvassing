export let expandButtonEl = document.querySelector("#list-expand-button");
let listContainerEl = document.querySelector("#voter-list-component").querySelector(".scroll-container");

// Store state: whether the list is currently expanded or not
export let listExpanded;
listExpanded = 0;

expandButtonEl.addEventListener("click", ( ) => {

  // If currently not expanded, expand it
  if(listExpanded == 0) {
    const mediaQuery = window.matchMedia("(min-width: 1200px)");

    if(mediaQuery.matches) {
      listContainerEl.classList.add("scroll-container-expanded-long"); // Expand to 75vh
    } else {
      listContainerEl.classList.add("scroll-container-expanded"); // Expand to 42vh
    }

    // Turn expand button upside down
    expandButtonEl.innerHTML = `<span class="material-symbols-outlined">expand_less</span>`;

    listExpanded = 1;

  } else {
    listContainerEl.className = "scroll-container";

    // Turn expand button upside down
    expandButtonEl.innerHTML = `<span class="material-symbols-outlined">expand_more</span>`;

    listExpanded = 0;
  }
});