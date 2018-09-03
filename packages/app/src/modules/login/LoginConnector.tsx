import * as React from 'react';
import { LoginController } from '@abb/controllers';
import { SecureStore } from 'expo';

import { LoginView } from './view/LoginView';
import { XID_KEY } from '../shared/constants';

export class LoginConnector extends React.PureComponent {
  saveSessionId = (xid: string) => {
    SecureStore.setItemAsync(XID_KEY, xid);
  };
  render() {
    return (
      <LoginController onSessionId={this.saveSessionId}>
        {({ submit }) => <LoginView submit={submit} />}
      </LoginController>
    );
  }
}
