import { getDownloadURL, ref, StorageReference, uploadBytes } from "firebase/storage";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  Unsubscribe,
} from 'firebase/firestore'
import React, { ChangeEvent, Component } from "react";
import { auth, db, storage } from "../services/firebaseServices";
import './ContestDetails.css'
import ContestSubmission from "./ContestSubmission";
import ContestVotePanel from "./ContestVotePanel";
import ImageUploadButton from "./UploadButton";
import Viewer from "react-viewer";
import AdminControls from "./admin/AdminControls";
import { Contest, ContestStatus, Rank, Submission, Vote } from "./constants/Constants";
import ContestSubmissionResults from "./ContestSubmissionResults";

type ContestDetailsProps = {
  contestId: string // The contest to show details for
  onExit: () => void
}

type ContestDetailsState = {
  contest?: Contest
  showViewer: boolean
  activeViewerIndex?: number
  submissions?: Submission[]
  selectedRank?: Rank
  votes?: Vote[]
}

export default class ContestDetails extends Component<ContestDetailsProps, ContestDetailsState> {
  private userFolder: StorageReference 
  private unsubscribeContest: Unsubscribe = () => { }
  private unsubscribeSubmissions: Unsubscribe = () => { }
  private unsubscribeVotes: Unsubscribe = () => { }

  constructor(props: any) {
    super(props)

    this.state = { showViewer: false }
    this.userFolder = ref(storage, auth.currentUser?.uid)

    this.onRankClick = this.onRankClick.bind(this)
    this.onClickSubmission = this.onClickSubmission.bind(this)
    this.onResetVotesClick = this.onResetVotesClick.bind(this)
    this.submitToContest = this.submitToContest.bind(this)
    this.onSelectContestStatus = this.onSelectContestStatus.bind(this)
  }

  async componentDidMount(): Promise<void> {
    this.unsubscribeContest = onSnapshot(
      doc(db, 'contests', this.props.contestId),
      (contest) => {
        this.setState({ contest: { id: contest.id, ...contest.data()} as Contest })
      }
    )

    this.unsubscribeSubmissions = onSnapshot(
      collection(db, 'contests', this.props.contestId, 'submissions'),
      (submissionDocs) => {
        this.setState({
          submissions: submissionDocs.docs.map(
            (doc) => ({ submissionId: doc.id!, ...doc.data() } as Submission)
          )
        })
      }
    )

    this.unsubscribeVotes = await onSnapshot(
      collection(db, 'contests', this.props.contestId, 'votes'),
      (votes) => {
        this.setState({
          votes: votes.docs.map(
            (doc) => ({ voteId: doc.id!, ...doc.data() } as Vote)
          )
        })
      }
    )

  }

  componentWillUnmount(): void {
    this.unsubscribeContest()
    this.unsubscribeSubmissions()
    this.unsubscribeVotes()
  }

  currentUserVotes(submissionId?: string) {
    var votes = this.state.votes?.filter(vote => vote.userId === auth.currentUser!.uid)

    if (submissionId) {
      votes = votes?.filter(vote => vote.submissionId === submissionId)
    }

    return votes
  }

  async submitToContest(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length !== 1) return

    const file = event.target.files[0]
    const fileRef = ref(this.userFolder, this.props.contestId)
    const uploadResult = await uploadBytes(fileRef, file)
    const imageUrl = await getDownloadURL(uploadResult.ref)

    await setDoc(
      doc(db, "contests", this.props.contestId, "submissions", auth.currentUser!.uid),
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
      const myVotes = this.currentUserVotes() ?? []
      for (const vote of myVotes) {
        if (vote.submissionId == submissionId) {
          return
        }
      }

      const rank = this.state.selectedRank
      const voteId = `${auth.currentUser!.uid}-${rank}`
      await setDoc(
        doc(db, "contests", this.props.contestId, "votes", voteId),
        { rank, submissionId, userId: auth.currentUser!.uid }
      )

      this.setState({
        selectedRank: undefined,
      })
    }
  }

  async onRankClick(rank: Rank) {
    this.setState({selectedRank: rank})
  }

  async onResetVotesClick() {
    const votes = this.currentUserVotes()
    if (!votes) {
      return
    }

    for (const vote of votes) {
      await deleteDoc(doc(db, "contests", this.props.contestId, "votes", vote.voteId));
    }

    this.setState({ selectedRank: undefined })
  }

  async onSelectContestStatus(contestStatus: ContestStatus) {
    if (!this.state.contest) {
      return
    }

    await setDoc(
      doc(db, "contests", this.state.contest.id),
      {
        name: this.state.contest.name,
        status: contestStatus
      }
    )
  }

  render() {
    return (
      <div className="contest-details">
        <div className="contest-title-container wide-flex-row">
          <button className="back-button" onClick={this.props.onExit}>Back</button>
          <h2>{this.state.contest?.name}</h2>
          <AdminControls
            contestStatus={this.state.contest?.status || 'open' }
            onSelectContestStatus={this.onSelectContestStatus}
            />
        </div>

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
            <React.Fragment key={submission.submissionId}>
              <ContestSubmission
                key={submission.submissionId}
                contest={this.state.contest!}
                rank={this.currentUserVotes(submission.submissionId)?.at(0)?.rank}
                submission={submission}
                onSubmissionClick={this.onClickSubmission}
              />
              {
                this.state.contest?.status === "closed" &&
                <ContestSubmissionResults
                  key={submission.submissionId + "results"}
                  submissionId={submission.submissionId}
                  votes={this.state.votes}
                />
              }
            </React.Fragment>
          ))}
        </div>

        { this.state.contest?.status === "open" && <ImageUploadButton onUploadFile={this.submitToContest} /> }
        { this.state.contest?.status === "voting" && 
          <ContestVotePanel
            onRankClick={this.onRankClick}
            onResetVotesClick={this.onResetVotesClick}
            selectedRank={this.state.selectedRank}
            votes={this.currentUserVotes()}
          />
        }
      </div>
    )
  }
}