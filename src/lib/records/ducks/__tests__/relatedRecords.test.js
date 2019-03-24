import * as records from '../relatedRecords'
import { defaultRecordState } from '../records'

const record = 'products'
const getState = state => ({
  ...defaultRecordState,
  ...state,
})
const { reducer } = records

const parentId = 100

describe('relatedRecords', () => {
  describe(records.MERGE_RELATED_RECORD_CUSTOM_PROPERTIES, () => {
    it('should merge customProperties', () => {
      const state = getState({
        [record]: {
          [parentId]: {
            ...defaultRecordState,
            customProperties: {
              ids: [1, 2, 3],
            },
          },
        },
      })

      const expected = getState({
        [record]: {
          [parentId]: {
            ...defaultRecordState,
            customProperties: {
              ids: [6, 7, 8],
            },
          },
        },
      })

      expect(
        reducer(
          state,
          records.mergeRelatedRecordCustomProperties(
            record,
            {
              ids: [6, 7, 8],
            },
            parentId,
          ),
        ),
      ).toEqual(expected)
    })
  })
  describe(records.DELETE_RELATED_RECORD_ITEM, () => {
    it('should delete a record item', () => {
      const state = getState({
        [record]: {
          [parentId]: {
            ...defaultRecordState,
            items: [1, 2, 3],
          },
        },
      })
      const expected = getState({
        [record]: {
          [parentId]: {
            ...defaultRecordState,
            items: [1, 3],
          },
        },
      })

      expect(
        reducer(state, records.deleteRelatedRecordItem(record, 2, parentId)),
      ).toEqual(expected)
    })
  })
})
