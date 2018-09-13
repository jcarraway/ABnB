import * as React from 'react';
import { RegisterController } from '@abb/controllers';

import { RegisterView } from './view/RegisterView';
import { RouteComponentProps } from 'react-router-dom';

// controller -> connector -> view
export class RegisterConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push('/m/confirm-email', {
      message: 'Confirm your email address',
    });
  };

  render() {
    return (
      <RegisterController>
        {({ submit }) => (
          <RegisterView onFinish={this.onFinish} submit={submit} />
        )}
      </RegisterController>
    );
  }
}
