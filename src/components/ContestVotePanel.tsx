import { Trophy } from "akar-icons";
import { Component } from "react";
import { Rank, RANKS, RANK_COLORS, Vote } from "./constants/Constants";
import './ContestVotePanel.css';

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
      <div className="contest-vote-panel wide-flex-row">
        {RANKS.map((rank) =>
          this.showVote(rank) ?
          <button
            key={rank}
            className={"trophy" + (this.props.selectedRank === rank ? " selected" : "")}
            onClick={() => this.props.onRankClick(rank)}>
              <Trophy color="black" fill={RANK_COLORS[rank]} />
          </button>
          :
          <button key={rank} disabled className="trophy">
            <Trophy color="black" />
          </button>
        )}
        <button className="reset-votes-button" onClick={this.props.onResetVotesClick}>Reset votes</button>
      </div>
    )
  }
}
