import { defaultRecordState } from 'lib/records/ducks/records'
import * as selectors from 'lib/records/selectors/relatedRecords'

const record = 'products'

describe('#relatedRecordSelector', () => {
  describe('when the record does not exist', () => {
    expect(selectors.relatedRecordSelector(record, 1)({})).toEqual(
      defaultRecordState,
    )
  })
  describe('when the record does exist', () => {
    it('should return record details', () => {
      const expected = { 1: 2 }
      const getParentRecordId = 1
      const state = {
        relatedRecords: { [record]: { [getParentRecordId]: expected } },
      }
      expect(
        selectors.relatedRecordSelector(record, getParentRecordId)(state),
      ).toEqual(expected)
    })
  })
})

describe('#allRelatedRecordsSelector', () => {
  it('should return a list of all entities found in related record', () => {
    const id = 1
    const getParentRecordId = 1
    const entity = { name: 'Product A' }
    const expected = [entity]
    const state = {
      entities: {
        [record]: { [id]: entity },
      },
      relatedRecords: {
        [record]: {
          [getParentRecordId]: {
            items: [id],
          },
        },
      },
    }
    expect(
      selectors.allRelatedRecordsSelector(record, getParentRecordId)(state),
    ).toEqual(expected)
  })
})

describe('#relatedRecordPropertySelector', () => {
  describe('when property does not exists', () => {
    it('should return fallback value', () => {
      const expected = 'What?'
      const getParentRecordId = 1
      expect(
        selectors.relatedRecordPropertySelector(
          record,
          getParentRecordId,
          'anything',
          expected,
        )(),
      ).toEqual(expected)
    })
  })
  describe('when property exists', () => {
    it('should return property value', () => {
      const property = 'loading'
      const getParentRecordId = 1
      const expected = true
      const state = {
        relatedRecords: {
          [record]: {
            [getParentRecordId]: {
              [property]: expected,
            },
          },
        },
      }
      expect(
        selectors.relatedRecordPropertySelector(
          record,
          getParentRecordId,
          property,
        )(state),
      ).toEqual(expected)
    })
  })
})

describe('#relatedRecordCustomPropertySelector', () => {
  describe('when custom property does not exists', () => {
    it('should return fallback value', () => {
      const expected = 'What?'
      const getParentRecordId = 1
      expect(
        selectors.relatedRecordCustomPropertySelector(
          record,
          getParentRecordId,
          'anything',
          expected,
        )(),
      ).toEqual(expected)
    })
  })
  describe('when custom property exists', () => {
    it('should return custom property value', () => {
      const property = 'loading'
      const getParentRecordId = 1
      const expected = true
      const state = {
        relatedRecords: {
          [record]: {
            [getParentRecordId]: {
              customProperties: { [property]: expected },
            },
          },
        },
      }
      expect(
        selectors.relatedRecordCustomPropertySelector(
          record,
          getParentRecordId,
          property,
        )(state),
      ).toEqual(expected)
    })
  })
})
