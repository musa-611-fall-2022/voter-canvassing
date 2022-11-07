# Canvassers

**Jie Li ([@Leejere](https://github.com/Leejere)), Myron Bañez ([@myronbanez](https://github.com/myronbanez))**

This is a mobile-friendly web-app used for voter canvassing. With this app, the canvasser can select the voters from a list and a map, view their status and other information, and record additional information regarding each canvassed voter. The more specific PRD for this product can be found in the same repository or via [this link](https://github.com/Leejere/js-voter-canvassing/blob/dev/PRD.md).

## Data source

## Functionalities

### 1. Load voter data manually or based on geolocation API

Overview of the `list-loader` module...

Load list by manually inputting list number. (**FINISHED**)

Load list via geolocation API. First identify the geoscope of each list, then get the user's current location and load the list that matches the best. (**TO BE DONE**)

### 2. Filter based on voter attributes

Filter by searching for name or address. (**FINISHED**)

Filter by canvassing status, voter status, party affiliation, etc. (**TO BE DONE**)

### 3. Display voters in a list and on a map

Display voters in a list, grouped by address. (**FINISHED**)

Display voters on the map, each marker representing one address (**FINISHED**)

### 4. Select voter from the list or map

Highlight a voter by clicking on the voter list or by clicking on the map markers. When clicking on a map marker, the first voter by this address is selected. (**FINISHED**)

Update selection by selecting a new voter. Unselect by clicking on the same voter again. (**FINISHED**)

### 5. Display detailed information of the selected voter

(**TO BE DONE**)

### 6. Update or add info of the selected voter

(**TO BE DONE**)

### 7. Save updated/added information locally or on the cloud

(**TO BE DONE**)

## Overview of collaboration