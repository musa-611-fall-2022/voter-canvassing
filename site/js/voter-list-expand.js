let expandButton = document.querySelector("#list-expand-button");
let listContainer = document.querySelector("#voter-list-component").querySelector(".scroll-container");
export let listExpanded;
listExpanded = 0;

expandButton.addEventListener("click", ( ) => {

  // If currently not expanded, expand it
  if(listExpanded == 0) {
    const mediaQuery = window.matchMedia("(min-width: 1200px)");

    if(mediaQuery.matches) {
      listContainer.classList.add("scroll-container-expanded-long");
    } else {
      listContainer.classList.add("scroll-container-expanded");
    }

    expandButton.innerHTML = `<span class="material-symbols-outlined">expand_less</span>`;

    listExpanded = 1;

  } else {
    listContainer.className = "scroll-container";

    expandButton.innerHTML = `<span class="material-symbols-outlined">expand_more</span>`;

    listExpanded = 0;
  }
});