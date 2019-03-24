import * as records from '../records'

const record = 'products'
const getState = state => ({
  ...records.defaultRecordState,
  ...state,
})
const reducer = records.recordReducer

describe('records', () => {
  describe(records.MERGE_RECORD_CUSTOM_PROPERTY, () => {
    it('should merge customProperties', () => {
      const state = getState({
        customProperties: {
          ids: [1, 2, 3],
        },
      })

      const expected = getState({
        customProperties: {
          ids: [6, 7, 8],
        },
      })

      expect(
        reducer(
          state,
          records.mergeRecordCustomProperties(record, {
            ids: [6, 7, 8],
          }),
        ),
      ).toEqual(expected)
    })
  })
  describe(records.UPDATE_RECORD_CUSTOM_PROPERTY, () => {
    it('should update a record\'s custom properties', () => {
      const state = getState({
        customProperties: {
          subKey: {
            id: [1, 2, 3],
          },
        },
      })
      const expected = getState({
        customProperties: {
          subKey: {
            id: 1,
          },
        },
      })

      const updater = () => 1
      const path = ['subKey', 'id']

      expect(
        reducer(
          state,
          records.updateRecordCustomProperty(record, path, updater),
        ),
      ).toEqual(expected)
    })
  })
  describe(records.SET_RECORD_PROPERTIES, () => {
    it('should update a record\'s property', () => {
      const state = getState({
        loading: false,
        refreshing: false,
      })
      const properties = {
        loading: true,
        refreshing: true,
      }
      const expected = getState({
        ...properties,
      })

      expect(
        reducer(state, records.setRecordProperties(record, properties)),
      ).toEqual(expected)
    })
  })
  describe(records.UPDATE_RECORD_PROPERTY, () => {
    it('should update a record\'s properties', () => {
      const state = getState({
        customProperties: {
          subKey: {
            id: [1, 2, 3],
          },
        },
      })
      const expected = getState({
        customProperties: {
          subKey: {
            id: 1,
          },
        },
      })

      const updater = () => 1
      const path = ['customProperties', 'subKey', 'id']

      expect(
        reducer(state, records.updateRecordProperty(record, path, updater)),
      ).toEqual(expected)
    })
  })
  describe(records.REPLACE_RECORD_ITEMS, () => {
    it('should replace a record', () => {
      const state = getState({
        items: [5, 6, 7],
        paging: {
          nextPage: 1,
        },
      })
      const expectedItems = [1, 2, 3, 4]
      const expectedRecord = {
        items: expectedItems,
        paging: {
          nextPage: 1,
        },
      }
      const expected = getState(expectedRecord)

      expect(
        reducer(state, records.replaceRecordItems(record, expectedItems)),
      ).toEqual(expected)
    })
  })
  describe(records.MERGE_RECORD_ITEMS, () => {
    it('should merge records', () => {
      const state = getState({
        items: [1, 2, 3],
        paging: {
          nextPage: 1,
        },
      })
      const newItems = [4, 5, 6]
      const expectedRecord = {
        items: [1, 2, 3, 4, 5, 6],
        paging: {
          nextPage: 1,
        },
      }
      const expected = getState(expectedRecord)

      expect(
        reducer(state, records.mergeRecordItems(record, newItems)),
      ).toEqual(expected)
    })
  })
  describe(records.APPEND_RECORD_ITEM, () => {
    it('should append record item', () => {
      const state = {
        items: [1, 2, 3],
      }
      const expectedRecord = {
        items: [1, 2, 3, 4],
      }
      const expected = getState(expectedRecord)

      expect(reducer(state, records.appendRecordItem(record, 4))).toEqual(
        expected,
      )
    })
  })
  describe(records.PREPEND_RECORD_ITEM, () => {
    it('should prepend record item', () => {
      const state = {
        items: [1, 2, 3],
      }
      const expectedRecord = {
        items: [4, 1, 2, 3],
      }
      const expected = getState(expectedRecord)

      expect(reducer(state, records.prependRecordItem(record, 4))).toEqual(
        expected,
      )
    })
  })
  describe(records.DELETE_RECORD_ITEM, () => {
    it('should delete a record item', () => {
      const state = {
        items: [1, 2, 3],
      }
      const expectedRecord = {
        items: [1, 3],
      }
      const expected = getState(expectedRecord)

      expect(reducer(state, records.deleteRecordItem(record, 2))).toEqual(
        expected,
      )
    })
  })
})
