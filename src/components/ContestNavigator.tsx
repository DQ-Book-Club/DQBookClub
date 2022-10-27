import { Component } from "react";
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
  }

  contestSelected(contest: Contest) {
    this.setState({ activeContest: contest })
  }

  contestExited() {
    this.setState({ activeContest: undefined })
  }

  render() {
    if (!this.state.activeContest) {
      return <ContestList onSelectContest={this.contestSelected} />
    } else {
      return <ContestDetails contest={this.state.activeContest} onExit={ this.contestExited } />
    }
  }
}