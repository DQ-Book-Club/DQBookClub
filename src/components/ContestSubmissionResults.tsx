import { Trophy } from "akar-icons";
import { RANKS, RANK_COLORS, Vote } from "./constants/Constants";
import styles from './contestdetails/ContestDetails.module.css'

type ContestSubmissionResultsProps = {
  submissionId: string
  votes?: Vote[]
}

export default function ContestSubmissionResults(props: ContestSubmissionResultsProps) {
  var results: {[key: string]: number} = {}
  if (props.votes) {
    props.votes
      .filter((vote) => vote.submissionId === props.submissionId)
      .forEach((vote) => {
        if (!results[vote.rank]) {
          results[vote.rank] = 0
        }
        results[vote.rank]++
      })
  }

  return (
    <div className={styles.photoDrawerDiv}>
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
