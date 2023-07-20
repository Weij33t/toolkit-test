import { Repository } from '../../__generated__/types'
import { RepositoryListItem } from '../RepositoryListItem/RepositoryListItem'
import s from './RepositoryList.module.scss'

interface RepositoryListProps {
  repos: Repository[]
  isLoading?: boolean
}

export const RepositoryList = ({ repos, isLoading }: RepositoryListProps) => {
  return (
    <div className={s.repositoryList}>
      {!isLoading &&
        repos?.map?.((repo) => (
          <RepositoryListItem key={repo.id} repository={repo} />
        ))}
    </div>
  )
}
