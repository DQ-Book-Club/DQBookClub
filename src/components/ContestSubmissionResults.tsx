import { Trophy } from "akar-icons";
import { Component } from "react";
import { RANKS, RANK_COLORS, Vote } from "./constants/Constants";
import "./ContestSubmissionResults.css"

type ContestSubmissionResultsProps = {
  submissionId: string
  votes?: Vote[]
}

export default class ContestSubmissionResults extends Component<ContestSubmissionResultsProps> {

  render() {
    var results: {[key: string]: number} = {}
    if (this.props.votes) {
      this.props.votes
        .filter((vote) => vote.submissionId === this.props.submissionId)
        .forEach((vote) => {
          if (!results[vote.rank]) {
            results[vote.rank] = 0
          }
          results[vote.rank]++
        })
    }

    return (
      <div>
        <div className="submission-results wide-flex-row">
          {RANKS.map((rank) =>
            <div className={rank + "Trophy "} key={rank}>
              <Trophy color="black" fill={RANK_COLORS[rank]} />
              <div className="contest-results">{results[rank] ?? 0}</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
