import { Key } from "react";
import { Component } from "react";
import { Submission } from "./ContestDetails";
import './ContestVotePanel.css';
import { Contest } from "./ContestList";

const RANKS = [
  "gold",
  "silver",
  "bronze"
] as const

export type Rank = typeof RANKS[number]

type ContestVotePanelProps = {
  onRankClick: (rank: Rank) => void | Promise<void>
}

type ContestVotePanelState = {
  selectedRank?: Rank
}

export default class ContestVotePanel extends Component<ContestVotePanelProps, ContestVotePanelState> {
  constructor(props: ContestVotePanelProps) {
    super(props)
    this.state = {}
  }

  clickRankHandler(rank: Rank) {
    this.setState({ selectedRank: rank })
    this.props.onRankClick(rank)
  }

  render() {
    return (
      <div>
        {RANKS.map((rank) =>
          <button
            key={rank}
            className={rank + "Button " + (this.state.selectedRank === rank ? "selected" : "")}
            onClick={() => this.clickRankHandler(rank)}>
            {rank}
          </button>
        )}
      </div>
    )
  }
}
