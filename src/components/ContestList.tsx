import { Component } from 'react';
import { Contest, ContestStatus, CONTEST_STATUS } from './constants/Constants';
import './ContestList.css'

type ContestListProps = {
  contests: Contest[]
  onSelectContest: (contestId: string) => void
}

export default class ContestList extends Component<ContestListProps> {
  constructor(props: ContestListProps) {
    super(props)
    this.state = { list: [] }
  }

  renderContestButton(contest: Contest) {
    return (
      <button
        className="contest"
        onClick={(event) => this.props.onSelectContest(contest.id)}
        key={contest.id}
      >
        {contest.name}
      </button>
    )
  }

  renderDetails(contests: Contest[], status: ContestStatus) {
    return (
      <details open={status === "open"} key={status + "details"}>
        <summary key={status + "summary"} className="summary">
          <h3>{this.capitalize(status)}</h3>
        </summary>
        <div className="contest-list" key={status + "div"}>
          {contests.map(contest => this.renderContestButton(contest))}
        </div>
      </details>
    )
  }

  capitalize(str: string) {
    return str.at(0)?.toUpperCase() + str.substring(1).toLocaleLowerCase()
  }

  render() {
    const contestsByStatus: { [key: string]: Contest[] } = {}
    for (const contest of this.props.contests) {
      if (!contestsByStatus[contest.status]) {
        contestsByStatus[contest.status] = []
      }
      contestsByStatus[contest.status].push(contest)
    }

    return (
      <div className="contest-details">
        {CONTEST_STATUS.map(status => (
          contestsByStatus[status] && this.renderDetails(contestsByStatus[status], status)
        ))
        }
      </div>
    )
  }
}