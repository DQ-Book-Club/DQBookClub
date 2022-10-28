import { setDoc, doc, collection, getDocs, getDoc } from "firebase/firestore";
import { Key } from "react";
import { Component } from "react";
import { db, auth } from "../services/firebaseServices";
import { Submission } from "./ContestDetails";
import ContestVotePanel, { type Rank } from "./ContestVotePanel";
import { Contest } from "./ContestList";

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
