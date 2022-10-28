import React, { Component } from "react";
import { Submission, Vote } from "./ContestDetails";
import './ContestVotePanel.css';
import { Contest } from "./ContestList";
import { Trophy } from "akar-icons";

const RANKS = [
  "gold",
  "silver",
  "bronze"
] as const

export type Rank = typeof RANKS[number]

type ContestVotePanelProps = {
  onRankClick: (rank: Rank) => void | Promise<void>
  onResetVotesClick: () => void
  votes: Vote[] | undefined
}

type ContestVotePanelState = {
  selectedRank?: Rank
}

export default class ContestVotePanel extends Component<ContestVotePanelProps, ContestVotePanelState> {
  constructor(props: ContestVotePanelProps) {
    super(props)
    this.state = {}

    this.resetVotes = this.resetVotes.bind(this)
  }

  clickRankHandler(rank: Rank) {
    this.setState({ selectedRank: rank })
    this.props.onRankClick(rank)
  }

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

  resetVotes() {
    this.props.onResetVotesClick()
    this.setState({ selectedRank: undefined })
  }

  render() {
    return (
      <React.Fragment>
        {RANKS.map((rank) =>
          this.showVote(rank) &&
          <button
            key={rank}
            className={rank + "Button " + (this.state.selectedRank === rank ? "selected" : "")}
            onClick={() => this.clickRankHandler(rank)}>
            <Trophy color="black" />
          </button>
        )}
        <button className="reset-votes-button" onClick={this.resetVotes}>Reset votes</button>
      </React.Fragment>
    )
  }
}
