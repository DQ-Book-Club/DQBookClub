export const CONTEST_STATUS = [
  "open",
  "voting",
  "closed"
] as const

export type ContestStatus = typeof CONTEST_STATUS[number]
