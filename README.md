# Voter Canvassing App 
### team members:
    * Yifei Sun
    * Xuening Zhang 
    * Tom Sun 
    * ...
* ...
## Core Interface Elements

### Layout

* [ ] Unless otherwise specified, all features should be useable on both small (mobile) and large (laptop/desktop) screens. **Your HTML document should have appropriate `meta` tag(s) to make this possible.**

### Loading voter files...

* [ ] There should be an `input` element on the page where you can enter a voter file number. **Save the `input` DOM element in a variable named `voterFileInput` attached to the global `window` object.** In other words:
  
  ```js
  window.voterFileInput = ...;
  ```

* [ ] There should be a `button` that will load the voter file number given in the `voterFileInput` when clicked. **Save the `button` DOM element in a variable named `voterFileLoadButton` attached to the global `window` object.**

### Listing and mapping voters...

* [ ] Your page should have an element that shows the voters (and their addresses) from a file. Note that the element _does not_ need to be a `ul`, `ol`, or any other HTML list element. Even though the element itself may not use a list tag like `ul` or `ol`, it will still function as a list and I'll still refer to it as one. **The list's DOM element should be available on the global `window` object as a variable named `voterList`.**

* [ ] Your page should have a Leaflet map to show voter locations. **The Leaflet map object should be available on the global `window` object as a variable named `voterMap`.**

* When you enter a file number, the voter information in that CSV file should be loaded onto the `voterMap` and into the `voterList`.
  * [ ] **Wrap each voter's name in an element (for example a `span`) with the class `voter-name`. Wrap addresses in an element with the class `voter-address`** You may choose to list each voter individually or grouped by address, which I would recommend. Either way, each voter's basic information (at least their name and street address) should be shown in the `voterList`.
  * [ ] **Represent the voters in the file with map markers.** You may choose to have one map marker to represent each voter, one marker to represent each address, or one marker to represent each _building_ (for example, two apartments that share the same street address are in the same building). I would generally recommend showing a marker for each building, as otherwise markers for different apartments or voters in the same building will be overlapping.

* [ ] When you click on a map marker, the marker should be highlighted in some way to show that it is selected. **Change the marker styles of a selected marker if it is a vector marker (e.g. `L.circleMarker`), or change the icon if it is a normal image marker (e.g. `L.marker`).**

* [ ] When you click on a map marker, the corresponding item(s) in the `voterList` should also be highlighted. **Add a class named `selected` to the appropriate element(s) within the `voterList`.** Use that `selected` class to apply different visual styles to the element(s).

### Displaying and editing voter details...

> _Note that if you decide to implement a workflow that doesn't precisely fit into the structure below, that's ok! Just talk with me about what the workflow is, because we may need to modify the project tests._

* [ ] When you click on a voter (or an address) in the `voterList`, a panel should be shown that contains details about the voter (or about each voter at the address). This panel could be represented in HTML with a `div`, `form`, `section`, or any of a number of other elements. **Give the voter information panel(s) a class of `voter-details`.**

* [ ] There should be _at least_ three separate input elements available for collecting facts about each voter (refer to the [product requirements document](PRD.md) that we created in class to remind yourself what kind of information should be collected). **Include fields for collecting voter information on each `voter-details` panel.**

* [ ] There should be a button on the voter details panel that allows a user to save the information entered when it is clicked. **Include such a button and give it a class `voter-details-save-btn`.**

* [ ] Voter details should be persisted to local memory. **When voter details are closed, the page is reloaded, and the voter information is loaded again, the value in each of the inputs in the `voter-details` panel should be recalled.**

## Stretch 1: Store Voter Details in the Cloud

* In addition to saving data locally on a single browser, make it so that voter data will be recalled regardless of the device you're using.

## Stretch 2: User Feedback

* Use a toast or some other type of notification method to let the user know that their data has been successfully saved.
* Give the user gamified feedback such as toasts or alerts when they're a certain amount of the way through the voter file.

## Stretch 3: High-level Voter File Stats

* Include a view (either on the same HTML page or a different one) where you can display high-level summary charts and info about a voter file, such as:
  * the proportion of each political party represented in the file,
  * the number/proportion of doors you've already knocked on, or
  * the number/proportion of people you've already talked to from the file.

## Stretch 4: Voting Record

* Include a voter's voting record information in the voter details, ordered by their participation in elections from most recent to least recent.

## Stretch 5: Geolocation

* Show the closest voters that the user hasn't yet visited at the top of the address list. This way the user should always be able to simple look at the next voter/address in the list.

  > Note: this can be done using (1) the [geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API), (2) a library like [turf.js](https://turfjs.org/), and (3) JavaScript's [`Array.sort` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) which can admittedly be pretty weird at first.
