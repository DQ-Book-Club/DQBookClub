import { collection, getDocs, onSnapshot, Unsubscribe } from 'firebase/firestore'
import { Component } from 'react';
import { db } from '../services/firebaseServices'
import './ContestList.css'

type ContestListState = {
  list: Contest[]
}

type ContestListProps = {}

type Contest = {
  status: string
  name: string
}

export default class ContestList extends Component<ContestListProps, ContestListState> {
  //private unsubscribe: Unsubscribe 
  constructor(props: any) {
    super(props)
    this.state = { list: [] }
  }

  async componentDidMount() {
    const snapshot = await getDocs(collection(db, 'contests'))
    this.setState({
      list: snapshot.docs.map(doc => doc.data() as Contest)
    })
  }

  render() {
    return (
      <div className="contest-list">
        {this.state.list.map(contest => <div className="contest" key={contest.name}>{contest.name}</div>) }
      </div>
    )
  }
}