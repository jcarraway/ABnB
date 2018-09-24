import * as React from 'react';
import { LoginController } from '@abb/controllers';
import { RouteComponentProps } from 'react-router-dom';

import { LoginView } from './view/LoginView';

// controller -> connector -> view
export class LoginConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    const {
      history,
      location: { state },
    } = this.props;
    if (state && state.next) {
      return history.push(state.next);
    }
    history.push('/');
  };

  render() {
    console.log('props.location.state: ', this.props.location.state);
    console.log('props.location.state.next: ', this.props.location.state.next);
    return (
      <LoginController>
        {({ submit }) => <LoginView onFinish={this.onFinish} submit={submit} />}
      </LoginController>
    );
  }
}
