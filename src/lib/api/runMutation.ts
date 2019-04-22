import apollo from 'lib/api/apollo'
import IGraphQLResponse from 'lib/api/IGraphQLResponse'

export const runMutation = async (
  mutationName: string,
  mutation: any,
  variables?: object,
): Promise<IGraphQLResponse> => {
  try {
    const response = await apollo.mutate({ mutation, variables })
    return {
      success: true,
      data: response.errors ? {} : response.data[mutationName],
    }
  } catch (e) {
    return {
      success: false,
      data: {},
      errors: e,
    }
  }
}
