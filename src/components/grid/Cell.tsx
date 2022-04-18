import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
}

export const Cell = ({ value, status }: Props) => {
  const classes = classnames(
    'w-[11vw] h-[6vh] lg:w-12 lg:h-12 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded',
    {
      'bg-white border-slate-200': !status,
      'bg-slate-400 text-white border-slate-400': status === 'absent',
      'bg-emerald-500 text-white border-emerald-500': status === 'correct',
      'bg-amber-500 text-white border-amber-500': status === 'present',
    }
  )

  return (
    <>
      <div className={classes}>{value}</div>
    </>
  )
}
