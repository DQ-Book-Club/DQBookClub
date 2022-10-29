import { Component } from "react";
import { Submission } from "./ContestDetails";
import { Contest } from "./ContestList";
import { Rank } from "./constants/Constants";

type ContestSubmissionProps = {
  contest: Contest
  submission: Submission
  rank?: Rank
  onSubmissionClick: (submission: Submission) => void | Promise<void>
}

export default class ContestSubmission extends Component<ContestSubmissionProps> {
  render() {
    return (
      <div onClick={() => this.props.onSubmissionClick(this.props.submission)}>
        <img key={this.props.submission.submissionId} src={this.props.submission.imageUrl}
          className={this.props.rank}  />
      </div>
    )
  }
}
