import * as React from 'react';
import { ForgotPasswordController } from '@abb/controllers';

import { ForgotPasswordView } from './view/ForgotPasswordView';

export class ForgotPasswordConnector extends React.PureComponent {
  render() {
    return (
      <ForgotPasswordController>
        {({ submit }) => <ForgotPasswordView submit={submit} />}
      </ForgotPasswordController>
    );
  }
}
