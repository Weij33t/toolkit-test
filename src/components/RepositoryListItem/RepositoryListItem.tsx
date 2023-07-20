import { Repository } from '../../__generated__/types'
import styles from './RepositoryListItem.module.scss'
import { Link } from 'react-router-dom'
import { getFormattedDate } from '../../common/utils'
import { RepoStar } from '../../shared/RepoStar/RepoStar'

interface RepositoryListItemProps {
  repository: Repository
}

export const RepositoryListItem = ({ repository }: RepositoryListItemProps) => {
  return (
    <div className={styles.RepoCard}>
      <Link to={`/${repository.id}`} className={styles.RepoName}>
        {repository.name}
      </Link>
      <RepoStar stargazerCount={repository.stargazerCount} />
      <span className={styles.RepoLastDate}>
        {getFormattedDate(new Date(repository.updatedAt))}
      </span>
      <span className={styles.RepoUrl}>
        Last committed date: {repository.url}
      </span>
    </div>
  )
}
