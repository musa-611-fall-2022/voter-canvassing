/*
MISCELLANEOUS
1. Shows or hide
  1. list loader component
  2. search box component
  3. voter list component
  when clicking on the hide-show button aside the list loader
2. Shows or hides components when clicking on the edit or go-back button

*/

// FIRST
// Top component show-hide

import { voterListExpandButtonEl, voterListContainerEl, onExpandButtonClick } from "./list-expand.js";

// State variable: whether the chunk is hidden at the moment
export let loaderElIsHidden = 0;

let hideButtonEl = document.querySelector("#list-loader-hide");
let listLoaderHidableEl = document.querySelector("#list-loader-hidable-chunk");
let searchBoxHidableEl = document.querySelector("#search-box-component");
let voterListHidableEl = document.querySelector("#voter-list-component");
export let bottomComponentEl = document.querySelector("#bottom-component");
let navComponentEl = document.querySelector("#nav-component");
let topComponentEl = document.querySelector("#top-component");
let editComponentEl = document.querySelector("#edit-component");

function hideChunk() {
  // Hide chunk by moving
  listLoaderHidableEl.style.transform = "translateX(-16em)";
  searchBoxHidableEl.style.transform = "translateX(-28em)";
  voterListHidableEl.style.transform = "translateX(-28em)";
  topComponentEl.style.pointerEvents = "none";

  // If the list is currently expanded, unexpand
  if(voterListExpandButtonEl.expandStatus == 1) {
    onExpandButtonClick(voterListExpandButtonEl, voterListContainerEl);
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
  topComponentEl.style.pointerEvents = "auto";

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

// THEN
// Edit button

// State of edit mode
let editMode = 0;

let editButtonEl = document.querySelector(".edit-button");

function switchToEdit() {
  // Move the top thing away
  topComponentEl.style.transition = 'transform 0.3s ease-in-out';
  navComponentEl.style.transition = 'transform 0.3s ease-in-out';
  topComponentEl.style.transform = "translateX(-28em)";
  navComponentEl.style.transform = "translateX(-28em)";

  // Move the whole thing up
  bottomComponentEl.style.top = "7vh";

  // Make the other panels show
  editComponentEl.style.transform = "translateX(0em)";

  // Change the icon
  setTimeout(() => {
    editButtonEl.querySelector("span").innerHTML = "chevron_left";
  }, 450);
}

function switchToNormal() {
  // Move the top thing away
  topComponentEl.style.transition = 'transform 0.7s ease-in-out';
  navComponentEl.style.transition = 'transform 0.7s ease-in-out';
  topComponentEl.style.transform = "translateX(0em)";
  navComponentEl.style.transform = "translateX(0em)";

  // Hide the other panels
  editComponentEl.style.transform = "translateX(-30em)";

  // Move the whole thing down
  bottomComponentEl.style.top = "72vh";

  // Change the icon
  setTimeout(() => {
    editButtonEl.querySelector("span").innerHTML = "edit";
  }, 450);
}

editButtonEl.addEventListener("click", () => {
  if(editMode === 0){
    switchToEdit();
    editMode = 1;
  } else {
    switchToNormal();
    editMode = 0;
  }
});