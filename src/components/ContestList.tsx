import { collection, getDocs, onSnapshot, Unsubscribe } from 'firebase/firestore'
import { Component } from 'react';
import { db } from '../services/firebaseServices'
import { Contest } from './constants/Constants';
import './ContestList.css'

type ContestListProps = {
  contests: Contest[]
  onSelectContest: (contestId: string) => void
}

export default class ContestList extends Component<ContestListProps> {
  //private unsubscribe: Unsubscribe 
  constructor(props: ContestListProps) {
    super(props)
    this.state = { list: [] }
  }

  render() {
    return (
      <div className="contest-list">
        {this.props.contests.map(contest => (
          <button
            className="contest"
            onClick={(event) => this.props.onSelectContest(contest.id)}
            key={contest.id}
          >
            {contest.name}
          </button>
        ))}
      </div>
    )
  }
}