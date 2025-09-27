import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'
import moment from 'moment-timezone'

type WordOfDay = {
  solution: string
  solutionIndex: number
}

const GAME_TIMEZONE = 'Asia/Aqtau'

const normalizeIndex = (rawIndex: number) => {
  const wrappedIndex = rawIndex % WORDS.length
  return wrappedIndex < 0 ? wrappedIndex + WORDS.length : wrappedIndex
}

const computeWordOfDayFromTimestamp = (timestamp: number): WordOfDay => {
  const dayOfYear = Number(moment(timestamp).tz(GAME_TIMEZONE).format('DDD'))
  const index = normalizeIndex(dayOfYear - 1)

  return {
    solution: WORDS[index].toUpperCase(),
    solutionIndex: dayOfYear,
  }
}

let cachedWordOfDay: WordOfDay = computeWordOfDayFromTimestamp(Date.now())
export let solution = cachedWordOfDay.solution
export let solutionIndex = cachedWordOfDay.solutionIndex

export const initializeWordOfDay = (timestamp: number) => {
  cachedWordOfDay = computeWordOfDayFromTimestamp(timestamp)
  solution = cachedWordOfDay.solution
  solutionIndex = cachedWordOfDay.solutionIndex
  return cachedWordOfDay
}

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDay = () => cachedWordOfDay
