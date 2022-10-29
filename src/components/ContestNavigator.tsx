import { collection, doc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { Component } from "react";
import { db } from "../services/firebaseServices";
import ContestDetails from "./ContestDetails";
import ContestList from "./ContestList";
import { Contest } from "./constants/Constants";

type ContestNavigatorState = {
  contests: Contest[]
  activeContestId?: string // The contest to show details for
}

export default class ContestNavigator extends Component<{}, ContestNavigatorState> {
  constructor(props: any) {
    super(props)
    this.state = {
      contests: []
    }
    this.contestSelected = this.contestSelected.bind(this)
    this.contestExited = this.contestExited.bind(this)
  }

  async componentDidMount() {
    const contestDocs = await getDocs(collection(db, 'contests'))
    this.setState({
      contests: contestDocs.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contest))
    })
  }

  contestSelected(contestId: string) {
    this.setState({ activeContestId: contestId })
  }

  contestExited() {
    this.setState({ activeContestId: undefined })
  }

  render() {
    if (!this.state.activeContestId) {
      return <ContestList contests={this.state.contests} onSelectContest={this.contestSelected} />
    } else {
      return <ContestDetails
        contestId={this.state.activeContestId}
        onExit={ this.contestExited }
      />
    }
  }
}