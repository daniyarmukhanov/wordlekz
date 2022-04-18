import { ReactNode } from 'react'
import classnames from 'classnames'
import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'

type Props = {
  children?: ReactNode
  value: KeyValue
  width?: number
  status?: CharStatus
  onClick: (value: KeyValue) => void
}

export const Key = ({
  children,
  status,
  width,
  value,
  onClick,
}: Props) => {
  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer w-full',
    {
      'bg-slate-200 hover:bg-slate-300 active:bg-slate-400': !status,
      'bg-slate-400 text-white': status === 'absent',
      'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white':
        status === 'correct',
      'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white':
        status === 'present',
    }
  )

  return (
    <div
      style={{ width: `${width}px`, height: '50px' }}
      className={classes}
      onClick={() => onClick(value)}
    >
      {children || value}
    </div>
  )
}
