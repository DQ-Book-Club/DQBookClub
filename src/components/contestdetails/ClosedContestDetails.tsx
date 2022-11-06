import React from "react"
import { Contest, Rank, Submission, Vote } from "../constants/Constants"
import ContestSubmission from "../ContestSubmission"
import ContestSubmissionResults from "../ContestSubmissionResults"
import ContestViewer from "../ContestViewer"

type ClosedContestDetailsProps = {
  contest: Contest
  submissions: Submission[] | undefined
  votes: Vote[] | undefined
  currentUserVotes: (submissionId?: string) => Vote[] | undefined
  onClickSubmission: (submission: Submission) => Promise<void>
  showViewer: boolean
  onCloseViewer: () => void
  activeViewerSubmission: Submission | undefined
}

function sortSubmissions(
  submissions: Submission[] | undefined,
  votes: Vote[] | undefined
): Submission[] {
  const sortedSubmissions = (submissions && [...submissions]) ?? []
  sortedSubmissions.sort((submission1: Submission, submission2: Submission) => {
    // The higher ranked submission should come first which means the first argument
    // is "less" than the second argument so the list is in decreasing order
    for (const rank of ["gold", "silver", "bronze"] as Rank[]) {
      if (getNumVotes(votes, submission1, rank) > getNumVotes(votes, submission2, rank)) {
        return -1
      } else if (getNumVotes(votes, submission1, rank) < getNumVotes(votes, submission2, rank)) {
        return 1
      }
    }
    return 0
  })
  return sortedSubmissions
}

function getNumVotes(
  votes: Vote[] | undefined,
  submission: Submission,
  rank: Rank
): number {
  return votes?.filter((vote) => vote.submissionId === submission.id && vote.rank === rank).length ?? 0
}

export default function ClosedContestDetails(props: ClosedContestDetailsProps) {
  const submissions = sortSubmissions(props.submissions, props.votes)
  const activeViewerIndex = submissions.indexOf(props.activeViewerSubmission!)

  return (
    <React.Fragment>
      <ContestViewer
        showViewer={props.showViewer}
        onClose={props.onCloseViewer}
        images={props.submissions?.map(({ imageUrl }) => ({ src: imageUrl }))}
        activeIndex={activeViewerIndex}
      />
      <div className="photo-drawer">
        { submissions?.map(submission => (
          <React.Fragment key={submission.id}>
            <ContestSubmission
              key={submission.id}
              contest={props.contest!}
              rank={props.currentUserVotes(submission.id)?.at(0)?.rank}
              submission={submission}
              onSubmissionClick={props.onClickSubmission}
            />
            <ContestSubmissionResults
              key={submission.id + "results"}
              submissionId={submission.id}
              votes={props.votes}
            />
            </React.Fragment>
          ))
        }
      </div>
    </React.Fragment>
  )
}
