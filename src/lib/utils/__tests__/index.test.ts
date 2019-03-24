import * as utils from '../index'

describe('#roundToDecimal', () => {
  it('should round to the decimal count specified', () => {
    expect(utils.roundToDecimal(123.444, 0)).toBe(123)
    expect(utils.roundToDecimal(123.444, 1)).toBe(123.4)
    expect(utils.roundToDecimal(123.444, 2)).toBe(123.44)
  })
})

describe('#getPercentage', () => {
  it('should return percentage in human readable format', () => {
    expect(utils.getPercentage(1 / 3)).toBe(33)
    expect(utils.getPercentage(1 / 2)).toBe(50)
    expect(utils.getPercentage(1 / 1)).toBe(100)
  })
})

describe('#sortAlphabetically', () => {
  const item1 = { name: 'Abc' }
  const item2 = { name: 'abc' }
  const item3 = { name: 'bcd' }
  const items = [item1, item2, item3]
  describe('when sort is ascending', () => {
    it('should return alphabetically less items first', () => {
      expect(utils.sortAlphabetically(true, 'name')(items)).toEqual([
        item2,
        item1,
        item3,
      ])
    })
  })
  describe('when sort is descending', () => {
    it('should return alphabetically more items first', () => {
      expect(utils.sortAlphabetically(false, 'name')(items)).toEqual([
        item3,
        item1,
        item2,
      ])
    })
  })
})

describe('#itemPropMatchesQuery', () => {
  it('should return true when the item prop contains the query', () => {
    const item = { name: 'Gentry' }
    expect(utils.itemPropMatchesQuery('gentry', 'name')(item)).toBe(true)
  })
})
