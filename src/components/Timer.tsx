import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import { XCircleIcon, DuplicateIcon } from '@heroicons/react/outline'
import { ShareIcon } from '@heroicons/react/solid'
import { TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { useState, useEffect } from 'react'

type Props = {
}



export const Timer = ({
}: Props) => {

  const [timeString, setTimeString] = useState('00:00:00');

  const date = new Date();
  const second = date.getSeconds();
  const minute = date.getMinutes();
  const hour = date.getHours();

  const leftHour = 23 - hour;
  const leftMinute = 59 - minute;
  const leftSeconds = 59 - second;

  let leftTime = (leftHour * 3600) + (leftMinute * 60) + leftSeconds;

  const updateTimer = () => {
    const h = Math.floor(leftTime / 3600);
    const m = Math.floor((leftTime - (h * 3600)) / 60);
    const s = Math.floor(leftTime % 60);

    setTimeString(`${('0'  + h).slice(-2)}:${('0'  + m).slice(-2)}:${('0'  + s).slice(-2)}`);

    leftTime--;
  }
  
  useEffect(() => {
    updateTimer();
    setInterval(updateTimer, 1000);
  }, [updateTimer])
  

  return (
    <div className='pb-4'>
      <p className="text-sm font-medium uppercase text-gray-900">Келесі сөзге дейін:</p>
      <p className="text-2xl uppercase text-gray-900">
        {timeString}
      </p>
    </div>
  );
}
