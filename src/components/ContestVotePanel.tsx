import { Trophy } from "akar-icons";
import { Component } from "react";
import { Rank, RANKS, Vote } from "./constants/Constants";
import './ContestVotePanel.css';
import "./Trophy.css";

type ContestVotePanelProps = {
  onRankClick: (rank: Rank) => void | Promise<void>
  onResetVotesClick: () => void
  selectedRank?: Rank
  votes: Vote[] | undefined
}

export default class ContestVotePanel extends Component<ContestVotePanelProps> {
  showVote(rank: Rank): boolean {
    if (!this.props.votes) {
      return false;
    }

    for (const vote of this.props.votes) {
      if (vote.rank == rank) {
        return false
      }
    }

    return true
  }

  render() {
    return (
      <div>
        {RANKS.map((rank) =>
          this.showVote(rank) &&
          <button
            key={rank}
            className={rank + "Trophy"}
            onClick={() => this.props.onRankClick(rank)}>
            <Trophy color={this.props.selectedRank === rank ? "red" : "black"} />
          </button>
        )}
        <button className="reset-votes-button" onClick={this.props.onResetVotesClick}>Reset votes</button>
      </div>
    )
  }
}
