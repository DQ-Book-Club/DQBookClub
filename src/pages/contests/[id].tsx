import { useRouter } from "next/router"
import { useEffect } from "react"
import ContestDetails from "../../components/contestdetails/ContestDetails"

export default function Contest() {
  const router = useRouter()
  const { id } = router.query
  const navigateHome = () => {
    router.push('/')
  }

  useEffect(() => {
    if (typeof id !== 'string') {
      navigateHome();
    }
  }, [])

  return typeof id !== 'string' ? <></> : <ContestDetails contestId={id as string} onExit={navigateHome}></ContestDetails>
}