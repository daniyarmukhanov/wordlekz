import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'

const WORDLE_DOMAIN = 'https://wordle.kz/'

export const shareClipboard = (guesses: string[]) => {
  navigator.clipboard.writeText(generateMessage(guesses))
}

export const shareOther = (guesses: string[], callback) => {
  navigator.share({
    text: generateMessage(guesses),
    url: WORDLE_DOMAIN
  })
  .then(() => callback())
}

export const generateMessage = (guesses: string[]) => {
  return 'Сөзділ ' +
      solutionIndex +
      ' ' +
      guesses.length +
      '/6\n\n' +
      generateEmojiGrid(guesses)
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .split('')
        .map((letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬛'
          }
        })
        .join('')
    })
    .join('\n')
}
