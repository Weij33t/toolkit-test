import { useSearchParams } from 'react-router-dom'
import { useGetRepositoryQuery } from '../__generated__/types'
import { QueryParams } from '../common/types'

export const SearchInput = () => {
  const [params, setParams] = useSearchParams()
  const { refetch, variables } = useGetRepositoryQuery()

  const changeQueryRepos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    const vars = { ...variables, query: value }
    setParams({
      ...Object.fromEntries(Array.from(params.entries())),
      [QueryParams.query]: value,
      [QueryParams.page]: '1',
    })
    await refetch(vars)
  }
  return (
    <input
      onBlur={changeQueryRepos}
      defaultValue={params.get(QueryParams.query) ?? undefined}
    />
  )
}
