import { getDownloadURL, ref, StorageReference, uploadBytes } from "firebase/storage";
import React, { ChangeEvent, Component } from "react";
import { auth, db, storage } from "../../services/firebaseServices";
import './ContestDetails.css'
import ContestSubmission from "../ContestSubmission";
import ImageUploadButton from "../UploadButton";
import { Contest, Submission } from "../constants/Constants";
import { doc, setDoc } from "firebase/firestore";

type OpenContestDetailsProps = {
  contest: Contest
  submissions?: Submission[]
  onClickSubmission: (submission: Submission) => void
}

export default class OpenContestDetails extends Component<OpenContestDetailsProps> {
  private userFolder: StorageReference

  constructor(props: OpenContestDetailsProps) {
    super(props)

    this.state = { showViewer: false }
    this.userFolder = ref(storage, auth.currentUser?.uid)

    this.submitToContest = this.submitToContest.bind(this)
  }

  async submitToContest(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length !== 1) return

    const file = event.target.files[0]
    const fileRef = ref(this.userFolder, this.props.contest.id)
    const uploadResult = await uploadBytes(fileRef, file)
    const imageUrl = await getDownloadURL(uploadResult.ref)

    await setDoc(
      doc(db, "contests", this.props.contest.id, "submissions", auth.currentUser!.uid),
      { imageUrl }
    )
  }

  render() {
    const submission = this.props.submissions
      ?.filter(submission => submission.userId === auth.currentUser!.uid)
      ?.at(0)

    return (
      <React.Fragment>
        <div className="photo-drawer">
        { submission &&
          <ContestSubmission
            key={submission.submissionId}
            contest={this.props.contest!}
            submission={submission}
            onSubmissionClick={this.props.onClickSubmission}
          />
        }
        </div>
        <ImageUploadButton onUploadFile={this.submitToContest} />
      </React.Fragment>
    )
  }
}
