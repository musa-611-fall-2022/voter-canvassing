#!/usr/bin/env python3

import csv
import pathlib
import sys

from data_dicts import FULL_VOTER_EXPORT_HEADER

OPT_DIR = pathlib.Path(__file__).resolve().parent.parent / 'opt'

def crossref_file(filename):
    filepath = OPT_DIR / filename
    voterfile = OPT_DIR / 'PHILADELPHIA FVE 20221010.txt'

    additional_fields = [
        "Party Code",  # (String)  See Political Party Code documentation
        "Last Name",  # (String)  
        "First Name",  # (String)  
        "House Number",  # (String)  Residential
        "House Number Suffix",  # (String)  Residential
        "Street Name",  # (String)  Residential
        "Apartment Number",  # (String)  Residential
        "Address Line 2",  # (String)  Residential
        "Home Phone",  # (String)  
        "Last Vote Date",  # (Date)  MM/DD/YYYY
    ]

    with filepath.open('rU') as infile:
        reader = csv.DictReader(infile, delimiter='\t')
        invalid_fieldnames = reader.fieldnames
        invalid_ballots = {
            row['VoterID']: row
            for row in reader
        }

    with voterfile.open('rU') as infile:
        reader = csv.DictReader(infile, delimiter='\t', fieldnames=FULL_VOTER_EXPORT_HEADER)
        for row in reader:
            if row['ID Number'] in invalid_ballots:
                voterid = row['ID Number']
                invalid_ballot = invalid_ballots[voterid]
                invalid_ballot.update({
                    f: row[f]
                    for f in additional_fields
                })
    
    writer = csv.DictWriter(sys.stdout, fieldnames=invalid_fieldnames + additional_fields)
    writer.writeheader()
    writer.writerows(invalid_ballots.values())

if __name__ == '__main__':
    crossref_file(sys.argv[1])