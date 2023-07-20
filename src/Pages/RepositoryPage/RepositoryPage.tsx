import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Repository, useGetRepoByIdQuery } from '../../__generated__/types'
import { getFormattedDate } from '../../common/utils'
import s from './RepositoryPage.module.scss'
import { RepoStar } from '../../shared/RepoStar/RepoStar'
import { AgainButton } from '../../shared/AgainButton'
import { ToastContainer, toast } from 'react-toastify'

export const RepositoryPage = () => {
  const params = useParams()
  const { data, loading, error, refetch } = useGetRepoByIdQuery({
    variables: { id: params.id! },
  })

  if (error) return <AgainButton refetch={refetch} message={error.message} />
  if (loading) return 'loading...'

  const repo = data?.node as Repository
  repo
  return (
    <div className={s.repoCard}>
      <div className={s.repoCardHeader}>
        <span className={s.repoName}>{repo.name}</span>
        <RepoStar stargazerCount={repo.stargazerCount} />
        <span className={s.repoDate}>
          Последнее обновление: {getFormattedDate(new Date(repo.updatedAt))}
        </span>
      </div>
      <div className={s.repoOwnerAvatar}>
        <span className={s.repoOwnerLogin}>{repo.owner.login}</span>
        <img src={repo.owner.avatarUrl} />
      </div>
      <div className={s.repoLanguages}>
        {repo.languages?.nodes?.map((lan) => (
          <span className={s.repoLanguage} color={lan?.color ?? undefined}>
            {lan?.name}
          </span>
        ))}
      </div>
      <div className={s.repoDesc}>{repo.shortDescriptionHTML}</div>
      <Link className={s.back} to={'/'}>
        Назад
      </Link>
      <ToastContainer />
    </div>
  )
}
