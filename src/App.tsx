import { InformationCircleIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { WinModal } from './components/modals/WinModal'
import { LostModal } from './components/modals/LostModal'
import { isWordInWordList, isWinningWord, solution } from './lib/words'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'

function App() {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [isLostModalOpen, setIsLostModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    if (loaded.guesses.includes(solution)) {
      setIsGameWon(true)
    }
    if (!loaded.guesses.includes(solution) && loaded.guesses.length > 5) {
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

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6) {
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

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
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
    <div className="h-screen basis flex lg:block flex-col justify-between">
      <Alert message="Бұндай сөз табылмады" isOpen={isWordNotFoundAlertOpen} />
      {/* <Alert
        message={`Қап, таба алмадыңыз. Бүгінгі сөз: ${solution} болған`}
        isOpen={isGameLost}
      /> */}
      <Alert
        message="Нәтижеңіз көшіріліп, керекті жерге қойылуға дайын"
        isOpen={shareComplete}
        variant="success"
      />

      <nav className='flex items-center justify-center flex-wrap bg-slate-100 p-2 mb-6 text-slate-700'>
        <div className='flex items-center justify-between navigation'>
          <div className='flex items-center mr-6'>
            <a className='font-semibold text-2xl tracking-tight' href='/'>Сөзділ</a>
          </div>
          <div className="w-auto">
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
    </div>
  )
}

export default App
