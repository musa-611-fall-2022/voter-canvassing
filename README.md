# **Canvassers**

by **Jie Li ([@Leejere](https://github.com/Leejere))** and **Myron Bañez ([@myronbanez](https://github.com/myronbanez))**


This is a mobile-friendly web-app used for voter canvassing. With this app, the canvasser can select the voters from a list and a map, view their status and other information, and record additional information regarding each canvassed voter. The more specific PRD for this product can be found in the same repository or via [this link](https://github.com/Leejere/js-voter-canvassing/blob/dev/PRD.md).

## **Data source**

The voter data comes from [Pennsylvania Department of State](https://www.dos.pa.gov/VotingElections/OtherServicesEvents/VotingElectionStatistics/Pages/VotingElectionStatistics.aspx), who provides voter registration data that includes the name, address, and other voting-related information. The data is available for purchase through [this link](https://www.pavoterservices.pa.gov/Pages/PurchasePAFULLVoterExport.aspx). For this application, only data from Philadelphia gets extracted, preprocessed, and geocoded by Mjumbe Poe ([@mjumbewu](https://github.com/mjumbewu)).

## **App functionalities**

### **Module 1: `list-loader`**

Due to its large amount, the data is split into more 1,000 separate lists, which also acts as task lists for the canvassing team. Each list can get loaded into the app asynchronously on demand. `list-loader.js` primarily deals with loading data. The loaded data gets stored in a global object, which is the data source for all other operations. The `list-loader` module is rerequisit for all other functions of the app.

There are two ways to load the data.

- [X] Load data by manually inputting list number. An input box exists on the top right of the viewport that allows the user to input a number, and then imports the corresponding list.

- [ ] **To Be Created.** Load data using geolocation API. By calculating the spatial scope of each voter list, the app can identify which scope the user is currently in using a geolocation API, and load the corresponding voter list.

### **Module 2: `list-filters`**

This filter filters voters after a particular voter list is loaded. The kernel script for the function resides in `list-filters.js`. This script workds as follows:

1. **Data import.**
2. **Event listeners.** Event listeners get added to all filter widgets.
3. **Filter application.** Every time a filter event is recorded, whether a new filter is applied, or a filter is modified or canceled, the `allFilters` functions takes the imported data and applies **all the filters** to produce to filtered version of the data.
4. **Display update.** Use the filtered data to updated the voter list and map, which gets implemented in the **Module 3**.

Several filters are available:

- [X] Filter voters by searching for name or address. The related functions are in `search-box.js`.

- [ ] **To Be Created** Filter voters by voter attributes. The related functions are in ...

### **Module 3: Voters display**

This model displayed either comprehensive or filtered voter data in a particular list in the voter list and on the map. 

- [X] `voter-list.js` takes the data, group them by address, and display them in a list. The list includes the voter's address, full name, and some icons that shows the voters canvassing status (pending visit, visited, awaiting followup, etc.), voter status (active or inactive), party registration, etc.

- [X] `map.js` takes the data, makes an geometry object (`FeatureCollection`), and display it on the map. Note that **every marker stands for one address** (house number + street name), rather than one voter.

### **Module 4: Voter selection**

This module highlights a **maximum of one voter** as the "selected" voter. The module resides in `selected-voter.js` and contains the following components:

- A global variable to store the ID of the currently selected voter. If no voter is currently under selection, the variable remains `undefined`.
- Event listeners added on each voter list item and map marker. Note that as each map marker stands for an address rather than a voter, **the first voter by this address** is selected when the marker is clicked on.
- Whenever the list item or marker get clicked, it either 
  - **highlights a new voter**, 
  - **updats the highlighted voter**, or 
  - **unhighlights the currently highlighted voter**.
- The highlighted voter ID is recorded and passed into **Module 5**.

### **Module 5: Voter information display** (To Be Created)

### **Module 6: Data edits and records** (To Be Created)

### **Module 7: Data saving** (To Be Created

## Overview of collaboration