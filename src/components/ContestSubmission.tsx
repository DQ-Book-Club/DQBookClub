import { Component } from "react";
import { Contest, Rank, Submission } from "./constants/Constants";
import "./ContestSubmission.css"

type ContestSubmissionProps = {
  contest: Contest
  submission: Submission
  rank?: Rank
  onSubmissionClick: (submission: Submission) => void | Promise<void>
}

export default function ContestSubmission(props: ContestSubmissionProps) {
  function getSubmissionImgClass() {
    if (props.contest.status === "voting") {
      return props.rank
    }
  }

  return (
    <div
      className="contest-submission"
      onClick={() => props.onSubmissionClick(props.submission)}
    >
      <img key={props.submission.submissionId} src={props.submission.imageUrl}
        className={getSubmissionImgClass()}  />
    </div>
  )
}
