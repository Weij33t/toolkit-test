import React, { useState } from 'react'
import classnames from 'classnames'
import {
  GetRepositoryDocument,
  useGetRepositoryQuery,
} from '../../__generated__/types'
import { generatePageNumbers, getCursorByPageNumber } from '../../common/utils'
import { QueryParams } from '../../common/types'
import { useSearchParams } from 'react-router-dom'

import s from './Paginator.module.scss'

export const Paginator = () => {
  const [params, setParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(
    +(params.get(QueryParams.page) ?? 1)
  )
  const { refetch, data, client } = useGetRepositoryQuery({
    variables: {
      query: params.get(QueryParams.query),
      after: getCursorByPageNumber(+(params.get(QueryParams.page) ?? 1)),
    },
  })
  const pages = generatePageNumbers(data?.search.repositoryCount ?? 0).slice(
    0,
    10
  )

  const setPage = async (number: number) => {
    if (number === currentPage) return

    const endCursor = getCursorByPageNumber(number)
    await refetch({ after: endCursor }).then((result) => {
      client.writeQuery({
        query: GetRepositoryDocument,
        data: result.data,
      })
      setCurrentPage(number)
    })

    setParams({
      ...Object.fromEntries(Array.from(params.entries())),
      [QueryParams.page]: String(number),
    })
  }

  const onPaginatorClick = (number: number) => () => {
    if (number === currentPage) return
    setPage(number)
  }

  return (
    <div className={s.pages}>
      {pages.map((number) => (
        <button
          key={number}
          onClick={onPaginatorClick(number)}
          className={classnames({ [s.currentPage]: number === currentPage })}
        >
          {number}
        </button>
      ))}
    </div>
  )
}
