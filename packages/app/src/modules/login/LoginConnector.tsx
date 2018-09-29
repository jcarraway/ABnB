import * as React from 'react';
import { LoginController } from '@abb/controllers';
import { RouteComponentProps } from 'react-router-native';
// import { SecureStore } from 'expo';

import { LoginView } from './view/LoginView';
// import { XID_KEY } from '../shared/constants';

export class LoginConnector extends React.PureComponent<RouteComponentProps<{}>> {
  onFinish = () => {
    this.props.history.push('/me')
  }
  // saveSessionId = (xid: string) => {
  //   SecureStore.setItemAsync(XID_KEY, xid);
  // };

  render() {
    return (
      <LoginController>
        {({ submit }) => <LoginView onFinish={this.onFinish} submit={submit} />}
      </LoginController>
    );
  }
}
