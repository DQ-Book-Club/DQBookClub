import { doc, getDoc } from "firebase/firestore";
import { Component } from "react";
import { auth, db } from "../../services/firebaseServices";
import { ContestStatus, CONTEST_STATUS } from "../constants/Constants";

const ADMIN_ROLE = "admin"

type AdminControlsProps = {
  contestStatus: string
  onSelectContestStatus: (status: ContestStatus) => void
}

type AdminControlsState = {
  userRole?: string
}

export default class AdminControls extends Component<AdminControlsProps, AdminControlsState> {
  constructor(props: AdminControlsProps) {
    super(props)

    this.state = {}
    this.onContestStatusSelect = this.onContestStatusSelect.bind(this)
  }

  async componentDidMount() {
    const user = await getDoc(doc(db, "users", auth.currentUser!.uid))
    this.setState({
      userRole: user.data()?.role
    })
  }

  onContestStatusSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    this.props.onSelectContestStatus(event.target.value as ContestStatus)
  }

  render() {
    if (this.state.userRole === ADMIN_ROLE) {
      return (
        <label htmlFor="contest-status">
          <select name="contest-status" value={this.props.contestStatus} onChange={this.onContestStatusSelect}>
            {CONTEST_STATUS.map((status) =>
              <option key={status} value={status}>{status}</option>
            )}
          </select>
        </label>
      )
    }
  }
}
