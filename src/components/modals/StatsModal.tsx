import { BaseModal } from "./BaseModal"
import { XCircleIcon } from '@heroicons/react/outline'

type Props = {
  isOpen: boolean
  handleClose: () => void
  stats: {
    gamesPlayed: number
    gamesWon: number
    currentStreak: number
    maxStreak: number
    guessDistribution: { [key: number]: number }
  }
}

export const StatsModal = ({ isOpen, handleClose, stats }: Props) => {
  const winRate = stats.gamesPlayed 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0

  const hasNoData = stats.gamesPlayed === 0

  return (
    <BaseModal title="Табу тарихы" isOpen={isOpen} handleClose={handleClose}>
      <XCircleIcon
        className="h-6 w-6 cursor-pointer absolute right-4 top-4"
        onClick={handleClose}
      />
      
      <div className="flex justify-between mt-6">
        <div className="flex justify-center items-center m-1">
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.gamesPlayed}</div>
            <div className="text-xs text-neutral-500">Ойналғаны</div>
          </div>
        </div>
        <div className="flex justify-center items-center m-1">
          <div className="text-center">
            <div className="text-3xl font-bold">{winRate}</div>
            <div className="text-xs text-neutral-500">Жеңіс %</div>
          </div>
        </div>
        <div className="flex justify-center items-center m-1">
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.currentStreak}</div>
            <div className="text-xs text-neutral-500">Қазіргі серия</div>
          </div>
        </div>
        <div className="flex justify-center items-center m-1">
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.maxStreak}</div>
            <div className="text-xs text-neutral-500">Ең ұзақ серия</div>
          </div>
        </div>
      </div>

      <div className="relative columns-1 justify-left mt-6">
        {Object.entries(stats.guessDistribution).map(([guess, freq]) => (
          <div key={guess} className="flex justify-left items-center mb-1.5 text-neutral-400">
            <div className="w-2">{guess}</div>
            <div className="w-full ml-2">
              <div
                className={`${hasNoData ? 'bg-gray-400' : 'bg-indigo-600'} text-xs font-medium text-white text-center p-0.5 rounded-md`}
                style={{
                  width: `${Math.max(
                    7,
                    (freq / Math.max(...Object.values(stats.guessDistribution), 1)) * 100
                  )}%`,
                }}
              >
                {freq}
              </div>
            </div>
          </div>
        ))}
        
        {/* Overlay for no data */}
        {hasNoData && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded">
            <p className="text-neutral-300 text-center font-medium">
              Әзірге дерек жоқ
            </p>
          </div>
        )}
      </div>
    </BaseModal>
  )
} 