import { Component } from "react";
import { Contest, Rank, Submission } from "./constants/Constants";
import "./ContestSubmission.css"

type ContestSubmissionProps = {
  contest: Contest
  submission: Submission
  rank?: Rank
  onSubmissionClick: (submission: Submission) => void | Promise<void>
}

export default class ContestSubmission extends Component<ContestSubmissionProps> {
  getSubmissionImgClass() {
    if (this.props.contest.status === "voting") {
      return this.props.rank
    }
  }

  render() {
    return (
      <div
        className="contest-submission"
        onClick={() => this.props.onSubmissionClick(this.props.submission)}
      >
        <img key={this.props.submission.submissionId} src={this.props.submission.imageUrl}
          className={this.getSubmissionImgClass()}  />
      </div>
    )
  }
}
