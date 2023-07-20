import { SearchInput } from '../../shared/SearchInput'
import { RepositoryList } from '../../components/RepositoryList/RepositoryList'
import { Paginator } from '../../components/Paginator/Paginator'
import {
  GetRepositoryDocument,
  GetRepositoryQuery,
  GetViewerRepositoriesDocument,
  GetViewerRepositoriesQuery,
  Repository,
} from '../../__generated__/types'
import { QueryParams } from '../../common/types'
import { useSearchParams } from 'react-router-dom'
import { getCursorByPageNumber } from '../../common/utils'
import s from './RepositoriesPage.module.scss'
import { useQuery } from '@apollo/client'
import { AgainButton } from '../../shared/AgainButton'

export const RepositoriesPage = () => {
  const [params] = useSearchParams()
  const isQuerySet = Boolean(params.get(QueryParams.query))
  const queryDocument = isQuerySet
    ? GetRepositoryDocument
    : GetViewerRepositoriesDocument

  const { data, loading, error, refetch } = useQuery(queryDocument, {
    variables: {
      query: params.get(QueryParams.query),
      after: getCursorByPageNumber(+(params.get(QueryParams.page) ?? 1)),
    },
  })

  if (error) return <AgainButton message={error.message} refetch={refetch} />

  const getRepos = () => {
    if (loading || data == null) return []
    let nodes
    if (!isQuerySet) {
      nodes = (data as GetViewerRepositoriesQuery)?.viewer.repositories.nodes
    } else {
      nodes = (data as GetRepositoryQuery)?.search.nodes
    }
    return nodes?.filter(
      (node) => node && Object.keys(node).length > 0
    ) as Repository[]
  }

  const getTotalCount = () =>
    isQuerySet
      ? data?.search.repositoryCount
      : data?.viewer.repositories.totalCount

  return (
    <div className={s.repositoriesPage}>
      <SearchInput />
      <RepositoryList repos={getRepos()} isLoading={loading} />
      <Paginator totalPages={getTotalCount()} query={queryDocument} />
    </div>
  )
}
