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
import React, { ChangeEvent, Component } from "react";
import { auth, db, storage } from "../services/firebaseServices";
import ContestList, { Contest } from "./ContestList";
import './ContestDetails.css'
import ContestSubmission from "./ContestSubmission";
import ContestVotePanel from "./ContestVotePanel";
import ImageUploadButton from "./UploadButton";
import Viewer from "react-viewer";
import AdminControls from "./admin/AdminControls";
import { ContestStatus, Rank } from "./constants/Constants";
import ContestSubmissionResults from "./ContestSubmissionResults";

type ContestDetailsProps = {
  contest: Contest // The contest to show details for
  onExit: () => void
  onSelectContestStatus: (status: ContestStatus) => void
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
  showViewer: boolean
  activeViewerIndex?: number
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

    this.state = { showViewer: false }
    this.userFolder = ref(storage, auth.currentUser?.uid)

    this.onRankClick = this.onRankClick.bind(this)
    this.onClickSubmission = this.onClickSubmission.bind(this)
    this.onResetVotesClick = this.onResetVotesClick.bind(this)
    this.submitToContest = this.submitToContest.bind(this)
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

  async onClickSubmission({ submissionId }: Submission) {
    if (!this.state.selectedRank) {
      const activeViewerIndex = this.state.submissions?.findIndex(
        submission => submission.submissionId === submissionId
      )
      this.setState({ showViewer: true, activeViewerIndex })
    } else {
      const rank = this.state.selectedRank
      const voteId = `${auth.currentUser!.uid}-${rank}`
      await setDoc(
        doc(db, "contests", this.props.contest.id, "votes", voteId),
        { rank, submissionId, userId: auth.currentUser!.uid }
      )

      if (this.state.votes) {
        this.setState({
          selectedRank: undefined,
          votes: [{ voteId, rank, submissionId, userId: auth.currentUser!.uid } as Vote, ...this.state.votes!]
        })
      }
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
    return (
      <div className="contest-details">
        <button onClick={this.props.onExit}>Back</button>

        <AdminControls
          contestStatus={this.props.contest.status}
          onSelectContestStatus={this.props.onSelectContestStatus}
        />
        <Viewer
          visible={this.state.showViewer}
          onClose={() => this.setState({ showViewer: false })}
          images={this.state.submissions?.map(({ imageUrl }) => ({ src: imageUrl }))}
          activeIndex={this.state.activeViewerIndex}
          attribute={false} showTotal={false} noImgDetails={true}
          noToolbar={true} scalable={false} drag={true}
        />
        <div className="photo-drawer">
          {this.state.submissions?.map(submission => (
            <React.Fragment>
              <ContestSubmission
                key={submission.submissionId}
                contest={this.props.contest}
                submission={submission}
                onSubmissionClick={this.onClickSubmission}
              />
              {
                this.props.contest.status === "closed" &&
                <ContestSubmissionResults
                  key={submission.submissionId + "results"}
                  submissionId={submission.submissionId}
                  votes={this.state.votes}
                />
              }
            </React.Fragment>
          ))}
        </div>


        <ContestVotePanel
          onRankClick={this.onRankClick}
          onResetVotesClick={this.onResetVotesClick}
          votes={this.state.votes}
        />
        <ImageUploadButton onUploadFile={this.submitToContest} />
      </div>
    )
  }
}