import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ViewMessages } from '@abb/controllers';

export class MessagesConnector extends React.PureComponent<
  RouteComponentProps<{ listingId: string }>
> {
  render() {
    const {
      match: {
        params: { listingId },
      },
    } = this.props;
    return (
      <ViewMessages listingId={listingId}>
        {({ loading, messages }) => {
          if (loading) {
            return <div>...loading</div>;
          }
          return (
            <div>
              {messages.map(m => (
                <div key={`message-${m.id}`}>
                  {m.user.email} - {m.text}
                </div>
              ))}
            </div>
          );
        }}
      </ViewMessages>
    );
  }
}
