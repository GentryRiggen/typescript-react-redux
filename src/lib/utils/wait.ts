export const waitFor = (timeout: number) =>
  new Promise(resolve => setTimeout(resolve, timeout))
