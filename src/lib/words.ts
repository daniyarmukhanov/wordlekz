import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'
import moment from 'moment-timezone';

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  // const epochMs = 1641013200000
  // const now = Date.now()
  // const msInDay = 86400000
  // const index = Math.floor((now - epochMs) / msInDay)
  moment.tz.setDefault("Asia/Almaty");
  const index = moment().format('DDD');
  // console.log(moment().format('DDD'));
  // console.log(moment().format());

  return {
    solution: WORDS[index].toUpperCase(),
    solutionIndex: index,
  }
}

export const { solution, solutionIndex } = getWordOfDay()
