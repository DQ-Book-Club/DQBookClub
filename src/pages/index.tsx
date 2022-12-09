import { collection, CollectionReference } from "firebase/firestore"
import { useRouter } from "next/router"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { Contest } from "../components/constants/Constants"
import ContestList from "../components/ContestList"

export default function Home() {
  const db = useFirestore()
  const router = useRouter()
  const { status, data: contests } = useFirestoreCollectionData(collection(db, 'contests') as CollectionReference<Contest>, { idField: 'id' })

  const routeToContest = (contestId: string) => {
    router.push('/contests/'+contestId)
  }

  if (status === 'loading') {
    <div>Loading...</div>
  } else {
    return <ContestList contests={contests} onSelectContest={routeToContest} />
  }
}
