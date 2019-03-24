import * as R from 'ramda'

import { defaultRecordState } from 'lib/records/ducks/records'
import * as selectors from 'lib/records/selectors/records'

const record = 'products'

describe('#recordSelector', () => {
  describe('when the record does not exist', () => {
    it('should return default record state', () => {
      expect(selectors.recordSelector(record)({})).toEqual(defaultRecordState)
    })
  })
  describe('when the record exists', () => {
    it('should return record details ', () => {
      const expected = { 1: 2 }
      const state = {
        records: { [record]: expected },
      }
      expect(selectors.recordSelector(record)(state)).toEqual(expected)
    })
  })
})

describe('#recordPropertyByIdSelector', () => {
  const expected = 'PUBLISHED'
  const getId = 1
  const property = 'status'
  const state = {
    entities: { [record]: { [getId]: { [property]: expected } } },
  }
  it('should return property on found record with specified id', () => {
    expect(
      selectors.recordPropertyByIdSelector(record, property, null, getId)(
        state,
      ),
    ).toEqual(expected)
  })
})

describe('#allRecordsSelector', () => {
  const id = 1
  const entity = { name: 'Product A' }
  const expected = [entity]
  const state = {
    entities: {
      [record]: { [id]: entity },
    },
    records: {
      [record]: {
        items: [id],
      },
    },
  }
  expect(selectors.allRecordsSelector(record)(state)).toEqual(expected)
})

describe('#recordPropertySelector', () => {
  describe('when property does not exists', () => {
    it('should return fallback value', () => {
      const expected = 'What?'
      expect(
        selectors.recordPropertySelector(record, 'anything', expected)(),
      ).toEqual(expected)
    })
  })
  describe('when property exists', () => {
    it('should return property value', () => {
      const property = 'loading'
      const expected = true
      const state = { records: { [record]: { [property]: expected } } }
      expect(selectors.recordPropertySelector(record, property)(state)).toEqual(
        expected,
      )
    })
  })
})

describe('#recordCustomPropertySelector', () => {
  describe('when custom property does not exists', () => {
    it('should return fallback value', () => {
      const expected = 'What?'
      expect(
        selectors.recordCustomPropertySelector(record, 'anything', expected)(),
      ).toEqual(expected)
    })
  })
  describe('when custom property exists', () => {
    it('should return custom property value', () => {
      const property = 'loading'
      const expected = true
      const state = {
        records: {
          [record]: {
            customProperties: { [property]: expected },
          },
        },
      }
      expect(
        selectors.recordCustomPropertySelector(record, property)(state),
      ).toEqual(expected)
    })
  })
})

describe('#searchItems', () => {
  describe('when the searcher is a string', () => {
    it('should filter items based on the prop designated by the searcher param', () => {
      const items = [{ name: 'abc' }, { name: '123' }]
      expect(selectors.searchItems(items, 'b', 'name')).toEqual([
        { name: 'abc' },
      ])
    })
  })

  describe('when the search is a function', () => {
    it('should use that function to filer the items', () => {
      const items = [{ name: 'abc' }, { name: 123 }]
      expect(selectors.searchItems(items, 123, query => R.propEq('name', query))).toEqual([
        { name: 123 },
      ])
    })
  })
})
