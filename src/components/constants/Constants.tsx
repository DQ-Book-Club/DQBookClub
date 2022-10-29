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
