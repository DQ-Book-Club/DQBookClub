import { Trophy } from "akar-icons";
import { Component } from "react";
import { Vote } from "./ContestDetails";
import './ContestVotePanel.css';

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
      <div>
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
      </div>
    )
  }
}
