import * as React from 'react';
import { LoginController } from '@abb/controllers';
import { RouteComponentProps } from 'react-router-dom';

import { LoginView } from './view/LoginView';

// controller -> connector -> view
export class LoginConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <LoginController>
        {({ submit }) => <LoginView onFinish={this.onFinish} submit={submit} />}
      </LoginController>
    );
  }
}
