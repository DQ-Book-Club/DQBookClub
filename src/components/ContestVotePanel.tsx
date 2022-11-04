import { Trophy } from "akar-icons";
import { Rank, RANKS, RANK_COLORS, Vote } from "./constants/Constants";
import './ContestVotePanel.css';

type ContestVotePanelProps = {
  onRankClick: (rank: Rank) => void | Promise<void>
  onResetVotesClick: () => void
  selectedRank?: Rank
  votes: Vote[] | undefined
}

export default function ContestVotePanel(props: ContestVotePanelProps) {
  function showVote(rank: Rank): boolean {
    return !props.votes?.some(vote => vote.rank === rank) ?? true
  }

  return (
    <div className="contest-vote-panel wide-flex-row">
      {RANKS.map((rank) =>
        showVote(rank) ?
        <button
          key={rank}
          className={"trophy" + (props.selectedRank === rank ? " selected" : "")}
          onClick={() => props.onRankClick(rank)}>
            <Trophy color="black" fill={RANK_COLORS[rank]} />
        </button>
        :
        <button key={rank} disabled className="trophy">
          <Trophy color="black" />
        </button>
      )}
      <button className="reset-votes-button" onClick={props.onResetVotesClick}>Reset votes</button>
    </div>
  )
}
