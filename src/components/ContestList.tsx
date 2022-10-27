import { collection, getDocs, onSnapshot, Unsubscribe } from 'firebase/firestore'
import { Component } from 'react';
import { db } from '../services/firebaseServices'
import './ContestList.css'

type ContestListState = {
  list: Contest[]
}

type ContestListProps = {
  onSelectContest: (contest: Contest) => void
}

export type Contest = {
  status: string
  name: string
  id: string
}

export default class ContestList extends Component<ContestListProps, ContestListState> {
  //private unsubscribe: Unsubscribe 
  constructor(props: ContestListProps) {
    super(props)
    this.state = { list: [] }
  }

  async componentDidMount() {
    const snapshot = await getDocs(collection(db, 'contests'))
    this.setState({
      list: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contest))
    })
  }

  render() {
    return (
      <div className="contest-list">
        {this.state.list.map(contest => (
          <button className="contest" onClick={(event) => this.props.onSelectContest(contest)} key={contest.id}>{contest.name}</button>
        ))}
      </div>
    )
  }
}