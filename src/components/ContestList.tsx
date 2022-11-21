import { Component } from 'react';
import { Contest, ContestStatus, CONTEST_STATUS } from './constants/Constants';
import './ContestList.css'

const CLOSED_DETAILS_CONTEST_STATUS = [
  "past"
]

type ContestListProps = {
  contests: Contest[]
  onSelectContest: (contestId: string) => void
}

export default function ContestList(props: ContestListProps) {
  function renderContestButton(contest: Contest) {
    return (
      <button
        className="contest"
        onClick={(event) => props.onSelectContest(contest.id)}
        key={contest.id}
      >
        {contest.name}
      </button>
    )
  }

  function renderDetails(contests: Contest[], status: ContestStatus) {
    return (
      <details open={!CLOSED_DETAILS_CONTEST_STATUS.includes(status)} key={status + "details"}>
        <summary key={status + "summary"} className="summary">
          <h3>{capitalize(status)}</h3>
        </summary>
        <div className="contest-list" key={status + "div"}>
          {contests.map(contest => renderContestButton(contest))}
        </div>
      </details>
    )
  }

  function capitalize(str: string) {
    return str.at(0)?.toUpperCase() + str.substring(1).toLocaleLowerCase()
  }

  let contestsByStatus: { [key in ContestStatus]?: Contest[] } = {};
  for (const contest of props.contests) {
    if (!contestsByStatus[contest.status]) {
      contestsByStatus[contest.status] = []
    }
    contestsByStatus[contest.status]!.push(contest)
  }

  return (
    <div className="contest-details">
      {CONTEST_STATUS.map(status => (
        contestsByStatus[status] && renderDetails(contestsByStatus[status]!, status)
      ))
      }
    </div>
  )
}