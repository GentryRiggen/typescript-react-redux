import * as R from 'ramda'
import { createSelector } from 'reselect'

import { assertSelected } from 'test/testUtils'

import * as entities from '../entities'

describe('#idSelector', () => {
  describe('when number', () => {
    it('return the number', () => {
      expect(entities.idSelector(1)()).toBe(1)
    })
  })
  describe('when string', () => {
    it('return use string as prop key and get off props', () => {
      const id = 'prop'
      const expected = 1
      const props = { [id]: expected }
      expect(entities.idSelector(id)({}, props)).toBe(expected)
    })
  })
  describe('when array', () => {
    it('return use array as path and get off props', () => {
      const id = ['prop', 'subprop']
      const expected = 1
      const props = { prop: { subprop: expected } }
      expect(entities.idSelector(id)({}, props)).toBe(expected)
    })
  })

  describe('when function', () => {
    it('should execute func with state and prop', () => {
      const props = { id: 1 }
      const id = createSelector(
        R.prop('entities'),
        (_, p) => R.prop('id', p),
        (stateEntities, propId) => R.prop(propId, stateEntities),
      )
      const expected = 5
      const state = { entities: { 1: expected } }
      expect(entities.idSelector(id)(state, props)).toBe(expected)
    })
  })
})

describe('#entitiesSelector', () => {
  const expected = { 1: 2 }
  const state = { entities: expected }
  assertSelected(entities.entitiesSelector, expected, state)
})

describe('#entityListSelector', () => {
  const expected = { 1: 2 }
  const key = 'products'
  const state = { entities: { [key]: expected } }
  assertSelected(entities.entityListSelector(key), expected, state)
})

describe('#entityByIdSelector', () => {
  describe('when the entity is not found', () => {
    const expected = true
    const key = 'products'
    const getId = 1
    const state = { entities: { [key]: null } }
    assertSelected(
      entities.entityByIdSelector(key, getId, expected),
      expected,
      state,
    )
  })
  describe('when the entity is found', () => {
    const expected = { 1: 2 }
    const key = 'products'
    const getId = 1
    const state = { entities: { [key]: { [getId]: expected } } }
    assertSelected(entities.entityByIdSelector(key, getId), expected, state)
  })
})
