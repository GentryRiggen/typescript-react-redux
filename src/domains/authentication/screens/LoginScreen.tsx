import React, { PureComponent } from 'react'
import { Formik, FormikActions, FormikProps, Form } from 'formik'
import * as Yup from 'yup'

import View from 'lib/components/View'
import Text from 'lib/components/Text'
import { login } from 'domains/authentication/workflows/login'
import Button from 'lib/components/Button'
import Image from 'lib/components/Image'
import Input from 'lib/components/Input'
import Spinner from 'lib/components/Spinner'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
})

interface LoginFormValues {
  email: string
  password: string
}

export default class LoginScreen extends PureComponent {
  state = {
    tokens: null,
  }

  onLogin = async (
    values: LoginFormValues,
    actions: FormikActions<LoginFormValues>,
  ) => {
    const success = await login(values.email, values.password)
    if (!success) {
      actions.setSubmitting(false)
    }
  }

  render() {
    return (
      <View
        flexible="column-center"
        flex={1}
        height="100vh"
        width="100vw"
        bg="background"
        p={3}
      >
        <View variant="paper" flexible="column-center" px={3} width={300}>
          <Image src="images/loginReadingBook.svg" width="100%" height="auto" />
          <Text variant="title" my={4}>
            Goodreads Killer
          </Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={this.onLogin}
            validationSchema={validationSchema}
          >
            {(props: FormikProps<LoginFormValues>) => {
              const { values, handleChange, isSubmitting } = props
              return (
                <View width="100%">
                  <Form>
                    <View flexible="column-center" width="100%">
                      <Input
                        type="email"
                        placeholder="somebody@example.com"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        my={2}
                      />
                      <Input
                        type="password"
                        placeholder="password"
                        my={2}
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                      />
                      {isSubmitting && <Spinner />}
                      {!isSubmitting && (
                        <Button m={3} type="submit">
                          Login
                        </Button>
                      )}
                    </View>
                  </Form>
                </View>
              )
            }}
          </Formik>
        </View>
      </View>
    )
  }
}
