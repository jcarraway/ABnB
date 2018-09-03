import * as React from 'react';
import { LoginController } from '@abb/controllers';

import { LoginView } from './view/LoginView';

// controller -> connector -> view
export class LoginConnector extends React.PureComponent {
  render() {
    return (
      <LoginController>
        {({ submit }) => <LoginView submit={submit} />}
      </LoginController>
    );
  }
}
