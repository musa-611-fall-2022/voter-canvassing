export let expandButtonEl = document.querySelector("#list-expand-button");
let listContainerEl = document.querySelector("#voter-list-component").querySelector(".scroll-container");

// Store state: whether the list is currently expanded or not
export let listExpanded;
listExpanded = 0;

function expandList() {
  const mediaQuery = window.matchMedia("(min-width: 1200px)");
  // If a wide screen, expand to longer
  if(mediaQuery.matches) {
    listContainerEl.classList.add("scroll-container-expanded-long"); // Expand to 75vh
  } else {
    listContainerEl.classList.add("scroll-container-expanded"); // Expand to 42vh
  }

  // Update button icon
  expandButtonEl.innerHTML = `<span class="material-symbols-outlined">expand_less</span>`;

  // Update state
  listExpanded = 1;
}

function unExpandList() {
  // Unexpand
  listContainerEl.className = "scroll-container";

  // Update button icon
  expandButtonEl.innerHTML = `<span class="material-symbols-outlined">expand_more</span>`;

  // Update state
  listExpanded = 0;
}

function onExpandButtonClick() {
  // If currently not expanded, expand it
  if(listExpanded == 0) {
    expandList();
  } else {
    unExpandList();
  }
}

expandButtonEl.addEventListener("click", onExpandButtonClick);

export {
  onExpandButtonClick,
};