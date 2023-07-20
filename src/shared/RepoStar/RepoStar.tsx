import { AiFillStar } from 'react-icons/ai'
import style from './RepoStar.module.scss'

interface RepoStarProps {
  stargazerCount: number
}

export const RepoStar = ({ stargazerCount }: RepoStarProps) => {
  return (
    <span className={style.RepoStar}>
      <AiFillStar />
      {stargazerCount}
    </span>
  )
}
