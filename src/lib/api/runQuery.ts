import apollo from 'lib/api/apollo'
import IGraphQLResponse from 'lib/api/IGraphQLResponse'

export const runQuery = async (
  queryName: string,
  query: any,
  variables?: object,
): Promise<IGraphQLResponse> => {
  try {
    const response = await apollo.query({ query, variables })
    return {
      success: true,
      data: response.errors ? {} : response.data[queryName],
    }
  } catch (e) {
    return {
      success: false,
      data: {},
      errors: e,
    }
  }
}
