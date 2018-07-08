import * as React from 'react';
import { RegisterController } from '@abb/controllers';

import { RegisterView } from './view/RegisterView';

// controller -> connector -> view
export class RegisterConnector extends React.PureComponent {
  render() {
    return (
      <RegisterController>
        {({ submit }: { submit: any }) => <RegisterView submit={submit} />}
      </RegisterController>
    );
  }
}
