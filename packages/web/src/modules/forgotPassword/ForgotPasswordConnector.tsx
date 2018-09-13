import * as React from 'react';
import { ForgotPasswordController } from '@abb/controllers';

import { ForgotPasswordView } from './view/ForgotPasswordView';
import { RouteComponentProps } from 'react-router-dom';

export class ForgotPasswordConnector extends React.PureComponent<RouteComponentProps<{}>> {
  onFinish = () => {
    this.props.history.push('/m/reset-password', {
      message: 'Check your email for a link to reset your password.',
    });
  };

  render() {
    return (
      <ForgotPasswordController>
        {({ submit }) => <ForgotPasswordView onFinish={this.onFinish} submit={submit} />}
      </ForgotPasswordController>
    );
  }
}
