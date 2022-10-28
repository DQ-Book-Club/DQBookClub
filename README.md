## Projecct Resources

* Icons: https://akaricons.com/
@GEORGE npm install this and make it part of the vote panel
https://github.com/artcoholic/akar-icons-app#readme


- Contest Details <-- This is the only thing that makes network calls
  - Back Button
  a. Open Details
    - Gallery(Submissions[])
      - Image[](Submission)
    - Upload Button(onFileChosen)
  b. Voting details
    - Gallery(Submissions[])
      - Image[](SumissionUrl) // with class?
    - Vote Panel(userVotes[], onSelectRank, onResetClicked)  GEORGE will do this.
  c. Closed Details
    - Gallery(Submissions[])
      - Votes Tally(Submission, votesForSubmission[])
        - Image(SumissionUrl)
      
  - Upload (if status === open)
  - Vote Panel (if status === )