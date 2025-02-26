const gameStateKey = 'gameState'

type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)

  return state ? (JSON.parse(state) as StoredGameState) : null
}

type GameStats = {
  gamesPlayed: number
  gamesWon: number
  currentStreak: number
  maxStreak: number
  guessDistribution: { [key: number]: number }
}

const defaultStats: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
}

const migrateOldGames = (): GameStats => {
  // Check if migration has already happened
  if (localStorage.getItem('statsMigrated')) {
    return loadStatsFromLocalStorage()
  }

  const oldGameState = localStorage.getItem('gameState')
  const oldGuesses = localStorage.getItem('guesses')
  const stats = loadStatsFromLocalStorage()

  if (oldGameState || oldGuesses) {
    try {
      const gameState = oldGameState ? JSON.parse(oldGameState) : null
      const guesses = oldGuesses ? JSON.parse(oldGuesses) : []
      
      if (gameState && gameState.guesses) {
        // Only count if game is finished (won or all 6 guesses used)
        const isGameWon = gameState.guesses.includes(gameState.solution)
        const isGameFinished = isGameWon || gameState.guesses.length >= 6
        
        if (!isGameFinished) {
          return stats
        }

        const numGuesses = gameState.guesses.length

        const newStats = {
          ...stats,
          gamesPlayed: stats.gamesPlayed + 1,
          gamesWon: stats.gamesWon + (isGameWon ? 1 : 0),
          currentStreak: isGameWon ? 1 : 0,
          maxStreak: isGameWon ? 1 : 0,
          guessDistribution: {
            ...stats.guessDistribution,
            [numGuesses]: isGameWon ? stats.guessDistribution[numGuesses] + 1 : stats.guessDistribution[numGuesses],
          },
        }

        saveStatsToLocalStorage(newStats)
        localStorage.setItem('statsMigrated', 'true')
        return newStats
      }
    } catch (e) {
      console.error('Error migrating old game data:', e)
    }
  }

  // Mark migration as complete even if no old data found
  localStorage.setItem('statsMigrated', 'true')
  return stats
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem('gameStats')
  return stats ? JSON.parse(stats) : defaultStats
}

// Update this function to include migration
export const initializeStats = () => {
  return migrateOldGames()
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem('gameStats', JSON.stringify(gameStats))
}
