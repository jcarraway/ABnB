import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ViewMessages } from '@abb/controllers';
import { ChatInput } from './ChatInput';

export class MessagesConnector extends React.PureComponent<
  RouteComponentProps<{ listingId: string }>
> {
  unsubscribe: () => void;

  render() {
    const {
      match: {
        params: { listingId },
      },
    } = this.props;
    return (
      <ViewMessages listingId={listingId}>
        {({ loading, messages, subscribe }) => {
          if (loading) {
            return <div>...loading</div>;
          }

          if (!this.unsubscribe) {
            this.unsubscribe = subscribe();
          }

          return (
            <div>
              {messages.map(m => (
                <div key={`message-${m.id}`}>
                  {m.user.email} - {m.text}
                </div>
              ))}
              <ChatInput listingId={listingId} />
            </div>
          );
        }}
      </ViewMessages>
    );
  }
}
