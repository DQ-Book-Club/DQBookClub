import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebaseServices";
import ContestDetails from "./contestdetails/ContestDetails";
import ContestList from "./ContestList";
import { Contest } from "./constants/Constants";
import { useEffect, useState } from "react";

export default function ContestNavigator() {
  const [contests, setContests] = useState<Contest[]>([])
  const [activeContestId, setActiveContestId] = useState<string>()

  useEffect(() => onSnapshot(
    collection(db, 'contests'),
    (contests) => setContests(contests.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contest)))
  ), [])

  if (!activeContestId) {
    return <ContestList contests={contests} onSelectContest={setActiveContestId} />
  } else {
    return <ContestDetails
      contestId={activeContestId}
      onExit={() => setActiveContestId(undefined) }
    />
  }
}