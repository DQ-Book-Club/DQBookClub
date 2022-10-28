import { getDownloadURL, ref, StorageReference, uploadBytes } from "firebase/storage";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Unsubscribe,
  where
} from 'firebase/firestore'
import { ChangeEvent, Component } from "react";
import { auth, db, storage } from "../services/firebaseServices";
import ContestList, { Contest } from "./ContestList";
import './ContestDetails.css'
import ContestSubmission from "./ContestSubmission";
import ContestVotePanel, { type Rank } from "./ContestVotePanel";

type ContestDetailsProps = {
  contest: Contest // The contest to show details for
  onExit: () => void
}

export type Submission = {
  imageUrl: string
  submissionId: string
}

export type Vote = {
  voteId: string
  rank: Rank
  submissionId: string
  userId: string
}

type ContestDetailsState = {
  submissions?: Submission[]
  selectedRank?: Rank
  votes?: Vote[]
}

export default class ContestDetails extends Component<ContestDetailsProps, ContestDetailsState> {
  private userFolder: StorageReference 
  private contestListener?: Unsubscribe
  private unsubscribeSubmissions?: Unsubscribe

  constructor(props: any) {
    super(props)

    this.state = {}
    this.userFolder = ref(storage, auth.currentUser?.uid)

    this.onRankClick = this.onRankClick.bind(this)
    this.onClickSubmission = this.onClickSubmission.bind(this)
    this.onResetVotesClick = this.onResetVotesClick.bind(this)
  }

  componentDidMount(): void {
    this.unsubscribeSubmissions = onSnapshot(collection(db, 'contests', this.props.contest.id, 'submissions'), (submissionDocs) => {
      this.setState({
        submissions: submissionDocs.docs.map(
          (doc) => ({submissionId: doc.id!, ...doc.data()} as Submission)
        )
      })
    })

    var queryVotes = getDocs(
      query(
        collection(db, 'contests', this.props.contest.id, 'votes'),
        where("userId", "==", auth.currentUser!.uid)
      )
    )
    queryVotes.then((votes) => {
      this.setState({
        votes: votes.docs.map(
          (doc) => ({voteId: doc.id!, ...doc.data()} as Vote)
        )
      })
    }).catch((error) => {
      console.log(error)
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

  async onClickSubmission({ submissionId: submissionId }: Submission) {
    if (!this.state.selectedRank) return

    const rank = this.state.selectedRank
    const voteId = `${auth.currentUser!.uid}-${rank}`
    await setDoc(
      doc(db, "contests", this.props.contest.id, "votes", voteId),
      { rank, submissionId, userId: auth.currentUser!.uid }
    )

    if (this.state.votes) {
      this.setState({
        selectedRank: undefined,
        votes: [{voteId, rank, submissionId, userId: auth.currentUser!.uid } as Vote, ...this.state.votes!]
      })
    }
  }

  async onRankClick(rank: Rank) {
    this.setState({selectedRank: rank})
  }

  async onResetVotesClick() {
    if (!this.state.votes) {
      return
    }

    for (const vote of this.state.votes) {
      await deleteDoc(doc(db, "contests", this.props.contest.id, "votes", vote.voteId));
    }

    this.setState({
      votes: []
    })
  }

  render() {
    const imageElement = conte
    return (
      <div>
        <button onClick={this.props.onExit}>Back</button>
        <button className="upload-button" onClick={this.passClickToInput}>Upload</button>
        <input type="file" style={{ display: 'none' }} id="upload-photos"
          accept="image/*" onChange={this.submitToContest.bind(this)} />
        <PhotoGallery submissionUrls={ } selectedPhoto={ }>
          {this.state.submissionUrls?.map(image => <Image)}
        </PhotoGallery>
        <div className="photo-drawer">
          {this.state.submissions?.map(submission => (
            <ContestSubmission
              key={submission.submissionId}
              contest={this.props.contest}
              submission={submission}
              onSubmissionClick={this.onClickSubmission}
            />
          ))}
        </div>
        <ContestVotePanel
          onRankClick={this.onRankClick}
          onResetVotesClick={this.onResetVotesClick}
          votes={this.state.votes}
        />
      </div>
    )
  }
}