import { InformationCircleIcon, ChartBarIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { WinModal } from './components/modals/WinModal'
import { LostModal } from './components/modals/LostModal'
import { StatsModal } from './components/modals/StatsModal'
import { isWordInWordList, isWinningWord, solution } from './lib/words'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
  initializeStats,
} from './lib/localStorage'
import WindowListener from './extra'

function App() {
  WindowListener();
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [isLostModalOpen, setIsLostModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [stats, setStats] = useState(() => initializeStats())
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    if (loaded.guesses.includes(solution)) {
      setIsGameWon(true)
    }
    if (!loaded.guesses.includes(solution) && loaded.guesses.length > 6) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  useEffect(()=>{
    let pop_status = localStorage.getItem('pop_status');
      if(!pop_status){
        setIsInfoModalOpen(true)
        localStorage.setItem('pop_status','1');
      }
  },[])

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameLost) {
      setIsLostModalOpen(true)
    }
  }, [isGameLost])

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true)
    }
  }, [isGameWon])

  useEffect(() => {
    const gameId = localStorage.getItem('currentGameId')
    const isGameCounted = localStorage.getItem(`game_${gameId}_counted`)

    if (isGameWon && !isGameCounted && gameId) {
      setStats((prevStats) => {
        const newStats = {
          gamesPlayed: prevStats.gamesPlayed + 1,
          gamesWon: prevStats.gamesWon + 1,
          currentStreak: prevStats.currentStreak + 1,
          maxStreak: Math.max(prevStats.currentStreak + 1, prevStats.maxStreak),
          guessDistribution: {
            ...prevStats.guessDistribution,
            [guesses.length]: prevStats.guessDistribution[guesses.length] + 1,
          },
        }
        saveStatsToLocalStorage(newStats)
        localStorage.setItem(`game_${gameId}_counted`, 'true')
        return newStats
      })
    }
  }, [isGameWon, guesses.length])

  useEffect(() => {
    const gameId = localStorage.getItem('currentGameId')
    const isGameCounted = localStorage.getItem(`game_${gameId}_counted`)

    if (isGameLost && !isGameCounted && gameId) {
      setStats((prevStats) => {
        const newStats = {
          gamesPlayed: prevStats.gamesPlayed + 1,
          gamesWon: prevStats.gamesWon,
          currentStreak: 0,
          maxStreak: prevStats.maxStreak,
          guessDistribution: { ...prevStats.guessDistribution },
        }
        saveStatsToLocalStorage(newStats)
        localStorage.setItem(`game_${gameId}_counted`, 'true')
        return newStats
      })
    }
  }, [isGameLost])

  useEffect(() => {
    if (solution) {
      const currentGameId = localStorage.getItem('currentGameId')
      if (currentGameId !== solution) {
        localStorage.setItem('currentGameId', solution)
      }
    }
  }, [solution])

  const onChar = (value: string) => {
    if (currentGuess.length < 6 && guesses.length < 7) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, 5000)
    }

    const winningWord = isWinningWord(currentGuess)

    if (currentGuess.length === 6 && guesses.length < 7 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        return setIsGameWon(true)
      }
      if (guesses.length === 5) {
        setIsGameLost(true)
        setIsLostModalOpen(true)
        return setTimeout(() => {
          setIsGameLost(false)
        }, 12000)
      }
    }
  }

  return (
    <div className="basis flex flex-col lg:block justify-between h-[100vh] lg:h-full">
      <Alert message="Ойын сөздігінде бұндай сөз табылмады" isOpen={isWordNotFoundAlertOpen} />
      {/* <Alert
        message={`Қап, таба алмадыңыз. Бүгінгі сөз: ${solution} болған`}
        isOpen={isGameLost}
      /> */}
      <Alert
        message="Нәтижеңіз көшіріліп, керекті жерге қойылуға дайын"
        isOpen={shareComplete}
        variant="success"
      />

      <nav className='flex items-center justify-center flex-wrap bg-slate-100 p-2 mb-3 text-slate-700'>
        <div className='flex items-center justify-between navigation'>
          <div className='flex items-center mr-6'>
            <a className='font-semibold text-2xl tracking-tight' href='/'>Сөзділ</a>
          </div>
          <div className="w-auto flex gap-3">
            <ChartBarIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setIsStatsModalOpen(true)}
            />
            <InformationCircleIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setIsInfoModalOpen(true)}
            />
          </div>
        </div>
      </nav>

      {/* <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">Сөзділ</h1>
      </div> */}


      <Grid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <WinModal
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        guesses={guesses}
        handleShare={() => {
          setIsWinModalOpen(false)
          setShareComplete(true)
          return setTimeout(() => {
            setShareComplete(false)
          }, 2000)
        }}
      />

      <LostModal
        isOpen={isLostModalOpen}
        handleClose={() => setIsLostModalOpen(false)}
        guesses={guesses}
        handleShare={() => {
          setIsLostModalOpen(false)
          setShareComplete(true)
          return setTimeout(() => {
            setShareComplete(false)
          }, 2000)
        }}
      />

      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />

      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        stats={stats}
      />
    </div>
  )
}



export default App
