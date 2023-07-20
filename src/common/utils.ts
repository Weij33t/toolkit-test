import { ITEMS_PER_PAGE } from './constants'
import { QueryParams } from './types'

export const getFormattedDate = (date: Date | null): string | null =>
  date == null
    ? date
    : date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()

export const getCursorByPageNumber = (pageNumber: number) =>
  btoa(`cursor:${ITEMS_PER_PAGE * (pageNumber - 1)}`)

export const writeQueryParam = (param: QueryParams, value: string) => {
  const url = new URL(window.location.href)
  url.searchParams.set(param, value)
  window.history.replaceState({}, '', url)
}

export const generatePageNumbers = (
  totalItems: number,
  pageSize = ITEMS_PER_PAGE
) => {
  const pageCount = Math.ceil(totalItems / pageSize)
  const pageNumbers = []

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i)
  }
  return pageNumbers
}
