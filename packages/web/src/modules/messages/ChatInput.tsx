import * as React from 'react';
import { CreateMessage } from '@abb/controllers';
import { Formik, Form, Field } from 'formik';
import { InputField } from '../shared/InputField';

interface FormValues {
  text: string;
}

interface Props {
  listingId: string;
}

export class ChatInput extends React.PureComponent<Props> {
  render() {
    const { listingId } = this.props;
    return (
      <CreateMessage>
        {({ createMessage }) => (
          <Formik<{}, FormValues>
            initialValues={{ text: '' }}
            onSubmit={async ({ text }, { resetForm }) => {
              await createMessage({
                variables: {
                  message: {
                    text,
                    listingId,
                  },
                },
              });
              resetForm();
            }}
          >
            {() => (
              <Form>
                <Field name="text" component={InputField} />
                <button type="submit">Send message</button>
              </Form>
            )}
          </Formik>
        )}
      </CreateMessage>
    );
  }
}
