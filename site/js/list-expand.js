/*
LIST EXPAND AND UNEXPAND FUNCTION
*/
export let voterListExpandButtonEl = document.querySelector("#voter-list-expand-button");
export let voterListContainerEl = document.querySelector("#voter-list-component").querySelector(".scroll-container");

// Store state: whether the list is currently expanded or not
voterListExpandButtonEl.expandStatus = 0;

function expandList(thisButtonEl, thisContainerEl) {
  const mediaQuery = window.matchMedia("(min-width: 1200px)");
  // If a wide screen, expand to longer
  if(mediaQuery.matches) {
    thisContainerEl.classList.add("scroll-container-expanded-long"); // Expand to 75vh max
  } else {
    thisContainerEl.classList.add("scroll-container-expanded"); // Expand to 42vh max
  }

  // Update button icon
  thisButtonEl.innerHTML = `<span class="material-symbols-outlined">expand_less</span>`;

  // Update state
  thisButtonEl.expandStatus = 1;
}

function unExpandList(thisButtonEl, thisContainerEl) {
  // Unexpand
  thisContainerEl.className = "scroll-container";

  // Update button icon
  thisButtonEl.innerHTML = `<span class="material-symbols-outlined">expand_more</span>`;

  // Update state
  thisButtonEl.expandStatus = 0;
}

function onExpandButtonClick(thisButtonEl, thisContainerEl) {
  console.log(thisButtonEl.expandStatus);
  // If currently not expanded, expand it
  if(thisButtonEl.expandStatus == 0) {
    expandList(thisButtonEl, thisContainerEl);
  } else {
    unExpandList(thisButtonEl, thisContainerEl);
  }
}

function addExpandListFunction(thisButtonEl, thisContainerEl) {
  thisButtonEl.addEventListener("click", ( ) => {
    onExpandButtonClick(thisButtonEl, thisContainerEl);
  });
}

addExpandListFunction(voterListExpandButtonEl, voterListContainerEl);

export {
  onExpandButtonClick,
};