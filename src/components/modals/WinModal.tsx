import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import { MiniGrid } from '../mini-grid/MiniGrid'
import { shareClipboard, shareOther, generateMessage, canShareOther, WORDLE_DOMAIN } from '../../lib/share'
import { XCircleIcon, DuplicateIcon } from '@heroicons/react/outline'
import { ExternalLinkIcon, ShareIcon } from '@heroicons/react/solid'
import { TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Timer } from '../Timer'
import { solution } from '../../lib/words'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  handleShare: () => void
}
console.log(solution);

export const WinModal = ({
  isOpen,
  handleClose,
  guesses,
  handleShare,
}: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto h-full"
        onClose={handleClose}
      >
        <div className="flex items-end justify-center min-h-full py-auto px-auto text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity h-full" />
          </Transition.Child>
          
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-full"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm w-full sm:p-6">
              <div className="absolute right-4 top-4">
                <XCircleIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => handleClose()}
                />
              </div>
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100">
                  <CheckIcon
                    className="h-6 w-6 text-emerald-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Әп, бәрекелді!
                  </Dialog.Title>
                  <div className="mt-2">
                    <MiniGrid guesses={guesses} />
                    <div className='mb-4'>
                      <button className="inline-flex items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold mb-1 py-2 px-4 border border-gray-400 rounded shadow">
                        <ExternalLinkIcon className='h-6 w-6 mr-2'/>
                        <a href={'https://sozdikqor.kz/search?q='+solution}>Сөз мағынасын көру</a>
                      </button>
                      <p className='text-sm text-gray-400'>Sozdikqor-ға сілтеме</p>
                    </div>
                    <hr className='my-4'></hr>
                    <Timer />
                    {/* <p className="text-sm text-gray-500">Енді осыны достарыңызбен бөліссеңіз болады</p>
                    <hr className='my-4'></hr> */}
                    {/* <p className="text-sm text-gray-500 mb-5">
                      Тапқан сөздің мағынасын <a className='text-indigo-400 visited:text-indigo-600 hover:text-indigo-600' href={'https://sozdikqor.kz/search?q='+solution}>осы жерден</a> көрсеңіз болады
                    </p> */}
                  </div>
                </div>
              </div>
              <div className="sm:mt-2 grid gap-2 grid-cols-1 max-w-full">
                <a
                  href="https://torteu.kz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-500 text-base font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 sm:text-sm"
                >
                  Төртеу түгел ойынын ашу
                  <span className="absolute -top-2 -right-2 inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-600 shadow">
                    жаңа
                  </span>
                </a>
                <TwitterShareButton title={generateMessage(guesses)} url={WORDLE_DOMAIN}>
                   <button
                    type="button"
                    className="inline-flex items-center justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-400 text-base font-medium text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  >
                    <FontAwesomeIcon icon={faTwitter} className="h-6 w-7 pr-1 fa-lg" />
                    Twitter
                  </button>
                </TwitterShareButton>
               {canShareOther() && <button
                  type="button"
                  className="inline-flex items-center justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => {
                    shareOther(guesses, handleShare)
                  }}
                >
                  <ShareIcon className="h-6 w-6 pr-1" />
                  Бөлісу
                </button>
               }
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => {
                    shareClipboard(guesses)
                    handleShare()
                  }}
                >
                  <DuplicateIcon className="h-6 w-6 pr-1" />
                  Нәтижені көшіру
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
