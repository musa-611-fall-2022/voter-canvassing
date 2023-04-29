The gist of working on this project is going to be similar to the school explorer project -- you're going to fork the repository and follow the requirements. The differrence this time is that you're going to be working on a team. My recommendation is that you choose one team member who will have the canonical version of the project. That team member will fork the project, and then give access to the other team member or members by going into the repository **Settings**, opening the **Collaborators** section, and clicking the **Add people** button (ensure that the team members have access to read and write to the repository). Then, everyone will clone that one team member's repository to their local computer. Fill out the names of the team members in your README.md file.

When you're working on the project, I recommend one of a few tactics:
1.  Pair programming -- Sit together and work on the same code as a pair (or triple). This can help to cut down on debug time and typo-like mistakes because you're able to talk about approaches to code in real-time.
1.  Divide and conquer -- If you're going to split up the code, I recommend identifying components (similar to the map and the list components in the School Explorer project) that can be worked on in parallel.

Needs:
* Pull up a list of registered voters within a division.
* Keep notes about touchpoints on those voters
* I want to know party registration
* I want to know the last time a voter voted (and for what party/ies)

Requirements:
* Find the next house based on what's nearest to me
* Show information about a house when I click on a marker/voter
  * The last time this person voted was _____
  * They voted for ___ parties
  * This person has been registered to vote since ______
  * OR This person is never reg

Stretch goals:
* In the list display, group voters by household.
* On the map, group voters by building address (i.e., if there are multiple households in one building, list them all together)

Preparation steps:
* I will "cut some turf" and expect users to enter their turf number to get their list.
* Summarize the number of voters canvassed and how many to go
* Find nearest 25 houses, and use the [Mapbox directions API](https://docs.mapbox.com/api/navigation/directions/) to find a route (make sure to make less than 100k requests, because that's the free tier https://www.mapbox.com/pricing/#directions)

Skills:
* fetch browser API
* Geolocation browser API
* Local storage browser API
* Mapbox directions API
* Geospatial analysis (turf)
* Basic charting

## Data Prepatation

1.  Purchase a voter export file from https://www.pavoterservices.pa.gov/pages/PurchasePAFullVoterExport.aspx
1.  Download the export files into the `opt/` folder.
1.  If the data dictionary is more recent than 2019 Dec 06, you may have to update the `bin/data_dicts.py` file.
1.  Geocode the voter addresses. As of the run on Oct 11 2023, about 97.36% of the addresses were able to geocode to an exact match.
    ```py
    Counter({
      ('Match', 'Exact'): 1034084,    # These are good to go!
      ('Match', 'Non_Exact'): 13652,  # These are tricky; most of the time they're good, but sometimes no. Exclude.
      ('No_Match', None): 9707,       # These are unfortunate; just exclude.
      ('Tie', None): 4637,            # Exclude these.
    })
    ```
    Also note that there were only 413,875 unique addresses found from 1,047,736 exact and non-exact matched addresses.