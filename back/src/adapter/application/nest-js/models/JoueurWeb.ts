import { LeaderWeb } from './LeaderWeb'

export type JoueurWeb = {
    id?: string
    couleur?: string
    pseudo?: string
    leaderAChoisir?: LeaderWeb[]
    leader?: LeaderWeb
}
