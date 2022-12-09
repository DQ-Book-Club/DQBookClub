import { doc } from "firebase/firestore";
import { useAuth, useFirestore, useFirestoreDocDataOnce } from "reactfire";
import { ContestStatus, CONTEST_STATUS } from "../constants/Constants";

const ADMIN_ROLE = "admin"

type AdminControlsProps = {
  contestStatus: string
  onSelectContestStatus: (status: ContestStatus) => void
}

export default function AdminControls({contestStatus, onSelectContestStatus}: AdminControlsProps): JSX.Element {
  const auth = useAuth()
  const db = useFirestore()
  const { status, data } = useFirestoreDocDataOnce(doc(db, "users", auth.currentUser!.uid))


  function onContestStatusSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    onSelectContestStatus(event.target.value as ContestStatus)
  }

  if (status === 'success' && data.role === ADMIN_ROLE) {
    return (
      <label htmlFor="contest-status">
        <select name="contest-status" value={contestStatus} onChange={onContestStatusSelect}>
          {CONTEST_STATUS.map((status) =>
            <option key={status} value={status}>{status}</option>
          )}
        </select>
      </label>
    )
  } else {
    return <></>;
  }
}
