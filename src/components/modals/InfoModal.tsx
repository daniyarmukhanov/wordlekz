import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Cell } from '../grid/Cell'
import { XCircleIcon } from '@heroicons/react/outline'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className="absolute right-4 top-4">
                <XCircleIcon
                  className="h-8 w-8 cursor-pointer text-gray-400"
                  onClick={() => handleClose()}
                />
              </div>
              <div>
                <div className="text-center">
                  <p className='my-0'>
                    <Dialog.Title
                      as="h1"
                      className="text-lg font-bold text-gray-900"
                    >
                      Ойын шарты
                    </Dialog.Title>
                  </p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-800">
                    6 рет байқап/талпынып, сөзді табыңыз.
                    Әр талпыныстан кейін шаршы түсі өзгеріп,
                    жауапқа қанша жақын екеніңізді көрсетеді.
                    </p>
                    <br></br>
                    <p className="text-sm text-gray-800">
                    Бір күнде бір сөз. Алматы уақыты (GMT/UTC+6) бойынша, күн сайын жаңа сөз шығып тұрады.
                    </p>

                    <div className="flex justify-center mb-1 mt-6">
                      <Cell value="Т" status="correct" />
                      <Cell value="О" />
                      <Cell value="М" />
                      <Cell value="А" />
                      <Cell value="Р" />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <b>Т</b> әрпі сөз ішінде бар әрі өз орнында тұр.
                    </p>

                    <div className="flex justify-center mb-1 mt-6">
                      <Cell value="С" />
                      <Cell value="Е" />
                      <Cell value="Н" status="present" />
                      <Cell value="І" />
                      <Cell value="М" />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <b>Н</b> әрпі сөз ішінде бар, алайда тұрған жері қате.
                    </p>

                    <div className="flex justify-center mb-1 mt-6">
                      <Cell value="Ү" />
                      <Cell value="Н" />
                      <Cell value="П" />
                      <Cell value="А" status="absent" />
                      <Cell value="З" />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <b>А</b> әрпі сөзде мүлде жоқ.
                    </p>
                  </div>
                  <hr className='mt-6 mb-4'></hr>
                  <div className="mt-2 text-left">
                    <p className="text-sm text-gray-400 mb-4">
                      Бұл ойынды <a className='text-indigo-400 visited:text-indigo-600 hover:text-indigo-600' href='https://t.me/qazcard'>Данияр Муханов</a> , <a className='text-indigo-400 visited:text-indigo-600 hover:text-indigo-600' href='https://t.me/qazsoz'>Ильяс Жолдасбай</a> және <a className='text-indigo-400 visited:text-indigo-600 hover:text-indigo-600' href='https://t.me/hiremegoogle'>Ержан Торғаев</a> жасаған.
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                      Сөздікқор <a className='text-indigo-400 visited:text-indigo-600 hover:text-indigo-600' href='https://github.com/jarjan/qate.js'>мына</a> репозиториден алынды.
                    </p>
                    <p className="text-sm text-gray-400">
                      Бастапқы код GitHub-тағы <a className='text-indigo-400 visited:text-indigo-600 hover:text-indigo-600' href='https://github.com/hannahcode/wordle'>Wordle Clone</a> репозиториінен алынған.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
