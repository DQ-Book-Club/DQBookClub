import { useRouter } from "next/router"
import ContestDetails from "../../components/contestdetails/ContestDetails"

export default function Contest() {
  const router = useRouter()
  const { id } = router.query
  const navigateHome = () => {
    router.push('/')
  }

  if (typeof id !== 'string') {
    navigateHome();
  } else {
    return <ContestDetails contestId={id} onExit={navigateHome}></ContestDetails>
  }
}