import { doc, setDoc } from "firebase/firestore";
import { Component } from "react";
import { db } from "../services/firebaseServices";
import { ContestStatus } from "./constants/Constants";
import ContestDetails from "./ContestDetails";
import ContestList, { Contest } from "./ContestList";

type ContestNavigatorState = {
  activeContest?: Contest // The contest to show details for
}

export default class ContestNavigator extends Component<{}, ContestNavigatorState> {
  constructor(props: any) {
    super(props)
    this.state = {}
    this.contestSelected = this.contestSelected.bind(this)
    this.contestExited = this.contestExited.bind(this)
    this.onSelectContestStatus = this.onSelectContestStatus.bind(this)
  }

  contestSelected(contest: Contest) {
    this.setState({ activeContest: contest })
  }

  contestExited() {
    this.setState({ activeContest: undefined })
  }

  async onSelectContestStatus(contestStatus: ContestStatus) {
    if (!this.state.activeContest) {
      return
    }

    this.setState({
      activeContest: {
        ...this.state.activeContest,
        status: contestStatus,
      }
    })

    await setDoc(
      doc(db, "contests", this.state.activeContest.id),
      {
        name: this.state.activeContest.name,
        status: contestStatus
      }
    )
  }

  render() {
    if (!this.state.activeContest) {
      return <ContestList onSelectContest={this.contestSelected} />
    } else {
      return <ContestDetails
        contest={this.state.activeContest}
        onSelectContestStatus={this.onSelectContestStatus}
        onExit={ this.contestExited }
      />
    }
  }
}