import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  setDoc,
} from 'firebase/firestore'
import { useState } from "react";
import { auth, db } from "../../services/firebaseServices";
import './ContestDetails.css'
import AdminControls from "../admin/AdminControls";
import { Contest, ContestStatus, Rank, Submission, Vote } from "../constants/Constants";
import OpenContestDetails from "./OpenContestDetails";
import { useSnapshot } from "../../hooks";
import VotingContestDetails from "./VotingContestDetails";
import ClosedContestDetails from './ClosedContestDetails';

type ContestDetailsProps = {
  contestId: string // The contest to show details for
  onExit: () => void
}

export default function ContestDetails(props: ContestDetailsProps) {
  const [showViewer, setShowViewer] = useState(false)
  const [activeViewerSubmission, setactiveViewerSubmission] = useState<Submission>()
  const [selectedRank, setSelectedRank] = useState<Rank>()
  const contest = useSnapshot(doc(db, 'contests', props.contestId) as DocumentReference<Contest>)
  const submissions = useSnapshot(collection(db, 'contests', props.contestId, 'submissions') as CollectionReference<Submission>)
  const votes = useSnapshot(collection(db, 'contests', props.contestId, 'votes') as CollectionReference<Vote>)

  function currentUserVotes(submissionId?: string) {
    let result = votes?.filter(vote => vote.userId === auth.currentUser!.uid)

    if (submissionId) {
      result = result?.filter(vote => vote.submissionId === submissionId)
    }
    return result
  }

  async function onClickSubmission(submission: Submission) {
    if (!selectedRank) {
      setShowViewer(true)
      setactiveViewerSubmission(submission)
    } else {
      if (!allowVote(submission)) {
        return
      }

      const voteId = `${auth.currentUser!.uid}-${selectedRank}`
      await setDoc(
        doc(db, "contests", props.contestId, "votes", voteId),
        {
          rank: selectedRank,
          submissionId: submission.id,
          userId: auth.currentUser!.uid
        }
      )
      setSelectedRank(undefined)
    }
  }

  function allowVote(submission: Submission) {
    if (submission.id === auth.currentUser!.uid) {
      return false
    }

    const myVote = currentUserVotes(submission.id) ?? []
    if (myVote.length > 0) {
      return false
    }

    return true
  }

  async function onRankClick(rank: Rank) {
    setSelectedRank(rank)
  }

  async function onResetVotesClick() {
    const votes = currentUserVotes()
    if (!votes) {
      return
    }

    for (const vote of votes) {
      await deleteDoc(doc(db, "contests", props.contestId, "votes", vote.id));
    }

    setSelectedRank(undefined)
  }

  async function onSelectContestStatus(contestStatus: ContestStatus) {
    if (!contest) {
      return
    }

    await setDoc(
      doc(db, "contests", contest.id),
      {
        name: contest.name,
        status: contestStatus
      }
    )
  }

  const onCloseViewer = () => setShowViewer(false)
  var contestDetails;
  switch (contest?.status) {
    case "open":
      contestDetails = <OpenContestDetails
        contest={contest}
        submissions={submissions}
        onClickSubmission={onClickSubmission}
        showViewer={showViewer}
        onCloseViewer={onCloseViewer}
      />
      break
    case "voting":
      contestDetails = <VotingContestDetails
        contest={contest}
        submissions={submissions}
        currentUserVotes={currentUserVotes}
        onClickSubmission={onClickSubmission}
        onRankClick={onRankClick}
        onResetVotesClick={onResetVotesClick}
        selectedRank={selectedRank}
        votes={currentUserVotes()}
        showViewer={showViewer}
        onCloseViewer={onCloseViewer}
        activeViewerSubmission={activeViewerSubmission}
      />
      break
    case "closed":
    case "past":
      contestDetails = <ClosedContestDetails
        contest={contest}
        submissions={submissions}
        votes={votes}
        onClickSubmission={onClickSubmission}
        currentUserVotes={currentUserVotes}
        showViewer={showViewer}
        onCloseViewer={onCloseViewer}
        activeViewerSubmission={activeViewerSubmission}
      />
      break
  }

  return (
    <div className="contest-details">
      <div className="contest-title-container wide-flex-row">
        <button className="back-button" onClick={props.onExit}>Back</button>
        <h2>{contest?.name}</h2>
        <AdminControls
          contestStatus={contest?.status || 'open' }
          onSelectContestStatus={onSelectContestStatus}
          />
      </div>

      {contestDetails}
    </div>
  )
}