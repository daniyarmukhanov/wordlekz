import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'

export const WORDLE_DOMAIN = 'wordle.kz'

export const canShareOther = () => {
  return !!navigator.share
}

export const shareClipboard = (guesses: string[]) => {
  navigator.clipboard.writeText(generateMessage(guesses) + WORDLE_DOMAIN)
}

export const generateMessage = (guesses: string[]) => {
  return 'Сөзділ ' +
      solutionIndex +
      ' ' +
      guesses.length +
      '/6\n\n' +
      generateEmojiGrid(guesses)+'\n\n'
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

export const shareOther = (guesses: string[], callback) => {
  console.log(generateMessage(guesses));
  navigator.share({
    text: generateMessage(guesses) + WORDLE_DOMAIN,
  })
  .then(() => callback())
}
