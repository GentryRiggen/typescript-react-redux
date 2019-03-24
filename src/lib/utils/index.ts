import * as R from 'ramda'

export const convertToInt = (item: any, nanValue = false) => {
  const parsedInt = parseInt(item, 10)

  if (Number.isNaN(parsedInt)) {
    return nanValue
  }

  return parsedInt
}

export const convertAllToInts = (items: number[], nanValue = false) =>
  R.map(item => convertToInt(item, nanValue), items)

const isStringAndEmpty = (str: string) =>
  R.is(String, str) && !str.replace(/\s/g, '').length

export const hasValue = (item: any) => {
  const anyTrue = R.anyPass([
    isStringAndEmpty,
    R.isEmpty,
    R.isNil,
    R.equals(false),
  ])(item)
  return !anyTrue
}

export const isNumeric = (value: any) => !Number.isNaN(parseInt(value, 10))
export const noop = () => null

export const roundToDecimal = (num: number, count = 2) =>
  parseFloat(num.toFixed(count))
export const getPercentage = (num: number) => roundToDecimal(num * 100, 0)

const normalizeValueForCompare = (value: any) => {
  if (!R.is(String, value)) {
    if (R.is(Number, value)) {
      return `${value}`
    } else {
      return hasValue(value) ? '1' : '0'
    }
  }

  return value
}
export const comparePropForSort = (sortAscending: boolean, prop: any) => (
  a: object,
  b: object,
) => {
  const getProp = R.is(Function, prop) ? prop : R.propOr('', prop)
  const firstCompare = sortAscending
    ? normalizeValueForCompare(getProp(a))
    : normalizeValueForCompare(getProp(b))
  const secondCompare = sortAscending
    ? normalizeValueForCompare(getProp(b))
    : normalizeValueForCompare(getProp(a))
  return firstCompare.localeCompare(secondCompare)
}

export const sortAlphabetically = (sortAscending: boolean, prop: any) =>
  R.sort(comparePropForSort(sortAscending, prop))

export const itemPropMatchesQuery = (query: string, searcher = 'name') => (
  item: object,
) =>
  R.propOr<string, object, string>('', searcher, item)
    .toLowerCase()
    .includes(query.toLowerCase())
