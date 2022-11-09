import { collection, CollectionReference } from "firebase/firestore";
import { db } from "../services/firebaseServices";
import ContestDetails from "./contestdetails/ContestDetails";
import ContestList from "./ContestList";
import { Contest } from "./constants/Constants";
import { useState } from "react";
import { useSnapshot } from "../hooks";

export default function ContestNavigator() {
  const [activeContestId, setActiveContestId] = useState<string>()
  const contests = useSnapshot(collection(db, 'contests') as CollectionReference<Contest>)

  if (!activeContestId) {
    return <ContestList contests={contests ?? []} onSelectContest={setActiveContestId} />
  } else {
    return <ContestDetails
      contestId={activeContestId}
      onExit={() => setActiveContestId(undefined) }
    />
  }
}