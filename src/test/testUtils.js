import React from 'react'
import * as R from 'ramda'
import { shallow, mount } from 'enzyme'

import rootReducer from 'lib/store/rootReducer'

export const assertSelected = (selector, value, state = {}, props = {}) => {
  it('should select the right piece of state', () => {
    expect(selector(state, props)).toEqual(value)
  })
}

const defaultState = rootReducer(undefined, {})
export const getState = (actions = [], initialState = defaultState) =>
  actions.reduce((state, action) => rootReducer(state, action), initialState)

export const shallowFactory = (Component, defaultProps = {}) => (
  props = {},
  children = [],
) =>
  shallow(
    <Component {...defaultProps} {...props}>
      {children}
    </Component>,
  )

export const mountFactory = (Component, defaultProps = {}) => (
  props = {},
  children = [],
) =>
  mount(
    <Component {...defaultProps} {...props}>
      {children}
    </Component>,
  )

export const findByDataTest = (component, dataTest) =>
  component.find(`[data-test="${dataTest}"]`)

export const getChildren = (component, dataTest) =>
  findByDataTest(component, dataTest).props().children

export const shallowRenderProp = (wrapper, prop) => {
  let component = wrapper.prop(prop)
  if (React.isValidElement(component)) {
    component = React.cloneElement(component)
  }

  return shallow(component)
}

export const shallowRenderFunctionProp = (wrapper, prop) => {
  const wrapperProp = wrapper.prop(prop)
  if (R.is(Function, wrapperProp)) {
    return shallow(wrapperProp())
  }

  return shallow(wrapper.prop(prop))
}

export const setWrapperProps = (wrapper, props) => {
  wrapper.setProps(props)
  wrapper.instance().forceUpdate()
}
