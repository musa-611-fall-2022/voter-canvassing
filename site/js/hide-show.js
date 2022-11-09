/*
MISCELLANEOUS
This script hides or shows
1. list loader component
2. search box component
3. voter list component
when clicking on the hide-show button.
It is not essential to the core functionalities of the app
*/

import { listExpanded, onExpandButtonClick } from "./voter-list-expand.js";

// State variable: whether the chunk is hidden at the moment
export let loaderElIsHidden = 0;

let hideButtonEl = document.querySelector("#list-loader-hide");
let listLoaderHidableEl = document.querySelector("#list-loader-hidable-chunk");
let searchBoxHidableEl = document.querySelector("#search-box-component");
let voterListHidableEl = document.querySelector("#voter-list-component");

function hideChunk() {
  // Hide chunk by moving
  listLoaderHidableEl.style.transform = "translateX(-16em)";
  searchBoxHidableEl.style.transform = "translateX(-23em)";
  voterListHidableEl.style.transform = "translateX(-23em)";

  // If the list is currently expanded, unexpand
  if(listExpanded == 1) {
    onExpandButtonClick();
  }

  // Update button icon
  hideButtonEl.innerHTML = `
  <span class="material-symbols-outlined">chevron_right</span>
  `;

  // Update state to hidden
  loaderElIsHidden = 1;
}

function showChunk() {
  // Move back
  listLoaderHidableEl.style.transform = "translateX(0em)";
  searchBoxHidableEl.style.transform = "translateX(0em)";
  voterListHidableEl.style.transform = "translateX(0em)";

  // Update button icon
  hideButtonEl.innerHTML = `
  <span class="material-symbols-outlined">chevron_left</span>
  `;

  // Update state to not hidden
  loaderElIsHidden = 0;
}

function onHideChunkClick() {
  if(loaderElIsHidden == 0) {
    hideChunk();
  } else {
    showChunk();
  }
}

// The list loader thing can be hidden (not very important)
hideButtonEl.addEventListener("click", onHideChunkClick);