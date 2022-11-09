import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { ChangeEvent } from "react";
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

export default function OpenContestDetails(props: OpenContestDetailsProps) {
  const userFolder = ref(storage, auth.currentUser?.uid)
  const submission = props.submissions
      ?.filter(submission => submission.id === auth.currentUser!.uid)
      ?.at(0)

  async function submitToContest(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length !== 1) return

    const file = event.target.files[0]
    const fileRef = ref(userFolder, props.contest.id)
    const uploadResult = await uploadBytes(fileRef, file)
    const imageUrl = await getDownloadURL(uploadResult.ref)

    await setDoc(
      doc(db, "contests", props.contest.id, "submissions", auth.currentUser!.uid),
      { imageUrl }
    )
  }

  return (
    <React.Fragment>
      <div className="photo-drawer">
      { submission &&
        <ContestSubmission
          key={submission.id}
          contest={props.contest}
          submission={submission}
          onSubmissionClick={props.onClickSubmission}
        />
      }
      </div>
      <ImageUploadButton onUploadFile={submitToContest} />
    </React.Fragment>
  )
}
