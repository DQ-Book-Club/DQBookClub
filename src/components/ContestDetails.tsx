import { getDownloadURL, ref, StorageReference, uploadBytes } from "firebase/storage";
import { collection, doc, onSnapshot, query, setDoc, Unsubscribe } from 'firebase/firestore'
import { ChangeEvent, Component } from "react";
import { auth, db, storage } from "../services/firebaseServices";
import ContestList, { Contest } from "./ContestList";
import './ContestDetails.css'

type ContestDetailsProps = {
  contest: Contest // The contest to show details for
  onExit: () => void
}

type Submission = {
  imageUrl: string
}

type ContestDetailsState = {
  submissionUrls?: string[]
}

export default class ContestDetails extends Component<ContestDetailsProps, ContestDetailsState> {
  private userFolder: StorageReference 
  private contestListener?: Unsubscribe
  private unsubscribeSubmissions?: Unsubscribe

  constructor(props: any) {
    super(props)

    this.state = {}
    this.userFolder = ref(storage, auth.currentUser?.uid)
  }

  componentDidMount(): void {
    this.unsubscribeSubmissions = onSnapshot(collection(db, 'contests', this.props.contest.id, 'submissions'), (submissionDocs) => {
      this.setState({
        submissionUrls: submissionDocs.docs.map((doc) => (doc.data() as Submission).imageUrl)
      })
    })
  }

  componentWillUnmount(): void {
    if (this.unsubscribeSubmissions) {
      this.unsubscribeSubmissions()
    }
  }

  passClickToInput() {
    document.getElementById('upload-photos')?.click()
  }

  async submitToContest(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length > 1) return

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
    return (
      <div>
        <button onClick={this.props.onExit}>Back</button>
        <button className="upload-button" onClick={this.passClickToInput}>Upload</button>
        <input type="file" style={{ display: 'none' }} id="upload-photos"
          accept="image/*" onChange={this.submitToContest.bind(this)} />
        <div className="photo-drawer">
          {this.state.submissionUrls?.map(photoUrl => (
            <img key={photoUrl} src={photoUrl} />
          ))}
      </div> 
      </div>
    )
  }
}