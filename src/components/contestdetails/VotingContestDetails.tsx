import React from "react"
import { useAuth } from "reactfire"
import { Contest, Rank, Submission, Vote } from "../constants/Constants"
import ContestSubmission from "../ContestSubmission"
import ContestViewer from "../ContestViewer"
import ContestVotePanel from "../ContestVotePanel"
import { hashCode, random } from "../utils/random"
import styles from './ContestDetails.module.css';

type VotingContestDetailsProps = {
  contest: Contest
  submissions: Submission[] | undefined
  selectedRank: Rank | undefined
  votes: Vote[] | undefined
  currentUserVotes: (submissionId?: string) => Vote[] | undefined
  onClickSubmission: (submission: Submission) => Promise<void>
  onRankClick: (rank: Rank) => Promise<void>
  onResetVotesClick: () => Promise<void>
  showViewer: boolean
  onCloseViewer: () => void
  activeViewerSubmission: Submission | undefined
}

/**
 * Shuffle the submissions
 *
 * Generate a random seed from the user id and contest id. Hence, the order of
 * the submissions will be random between every user and contest combination,
 * but deterministic for each individual combination because the same seed can
 * be generated each time. Then sort the submissions randomly with that seed.
 *
 * @param submissions The submissions to shuffle
 * @param userId The user id
 * @param contestId The contest id
 */
function shuffleSubmissions(
  submissions: Submission[] | undefined,
  userId: string,
  contestId: string
): Submission[] {
  var seed = hashCode(userId + contestId)
  const shuffledSubmissions = (submissions && [...submissions]) ?? []
  shuffledSubmissions.sort(() => {
    // Get a random number between 0 and 1 exclusive
    var rand = random(seed)

    // Subtract 0.5 so the range of the random number is -0.5 to 0.5 exclusive
    rand = rand - 0.5

    // Increment the seed so the number random next is different
    seed++

    // Return the random number between -0.5 to 0.5 exclusive so the order is random
    return rand
  })
  return shuffledSubmissions
}

export default function VotingContestDetails(props: VotingContestDetailsProps) {
  const auth = useAuth();
  const submissions = shuffleSubmissions(props.submissions, auth.currentUser!.uid, props.contest.id)
  const activeViewerIndex = submissions.indexOf(props.activeViewerSubmission!)

  return (
    <React.Fragment>
      <ContestViewer
        showViewer={props.showViewer}
        onClose={props.onCloseViewer}
        images={submissions?.map(({ imageUrl }) => ({ src: imageUrl }))}
        activeIndex={activeViewerIndex}
      />

      <div className={styles.photoDrawer}>
        { submissions?.map(submission => (
            <ContestSubmission
              key={submission.id}
              contest={props.contest!}
              rank={props.currentUserVotes(submission.id)?.at(0)?.rank}
              submission={submission}
              onSubmissionClick={props.onClickSubmission}
            />
          ))
        }
      </div>
      <ContestVotePanel
        onRankClick={props.onRankClick}
        onResetVotesClick={props.onResetVotesClick}
        selectedRank={props.selectedRank}
        votes={props.votes}
      />
    </React.Fragment>
  )
}
