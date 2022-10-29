export const CONTEST_STATUS = [
  "open",
  "voting",
  "closed"
] as const

export type ContestStatus = typeof CONTEST_STATUS[number]

export const RANKS = [
  "gold",
  "silver",
  "bronze"
] as const

export type Rank = typeof RANKS[number]

export type Contest = {
  status: ContestStatus
  name: string
  id: string
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