import { ComponentClass } from 'react'

export const getComponentName = (WrappedComponent: ComponentClass): string =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component'

export const getDisplayName = (hoc: string, WrappedComponent: ComponentClass) =>
  `${hoc}(${getComponentName(WrappedComponent)})`
