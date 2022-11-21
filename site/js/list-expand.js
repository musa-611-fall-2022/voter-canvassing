/*
LIST EXPAND AND UNEXPAND FUNCTION
*/
export let voterListExpandButtonEl = document.querySelector("#voter-list-expand-button");
export let voterListContainerEl = document.querySelector("#voter-list-component").querySelector(".scroll-container");

export let electionListExpandButtonEl = document.querySelector("#election-list-expand-button");
export let electionListContainerEl = document.querySelector(".voter-history-panel").querySelector(".scroll-container");

// Store state: whether the list is currently expanded or not
voterListExpandButtonEl.expandStatus = 0;
electionListExpandButtonEl.expandStatus = 0;

function expandList(thisButtonEl, thisContainerEl) {

  thisContainerEl.classList.add("scroll-container-expanded"); // Expand to 42vh max

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

// Voter list
addExpandListFunction(voterListExpandButtonEl, voterListContainerEl);

// Voting history list
addExpandListFunction(electionListExpandButtonEl, electionListContainerEl);

export {
  onExpandButtonClick,
};