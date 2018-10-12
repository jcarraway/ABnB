// @ts-ignore
import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  ViewMessagesQuery_findMessages,
  ViewMessagesQueryVariables,
  ViewMessagesQuery,
} from '../../schemaTypes';

export const viewMessagesQuery = gql`
  query ViewMessagesQuery($listingId: String!) {
    findMessages(listingId: $listingId) {
      id
      text
      user {
        email
        id
      }
      listingId
    }
  }
`;

export const newMessageSubscription = gql`
  subscription($listingId: String!) {
    newMessage(listingId: $listingId) {
      id
      text
      user {
        email
        id
      }
      listingId
    }
  }
`;

interface WithViewMessages {
  messages: ViewMessagesQuery_findMessages[];
  loading: boolean;
  subscribe: () => () => void;
}

interface Props {
  listingId: string;
  children: (data: WithViewMessages) => JSX.Element | null;
}

export class ViewMessages extends React.PureComponent<Props> {
  render() {
    const { children, listingId } = this.props;
    return (
      <Query<ViewMessagesQuery, ViewMessagesQueryVariables>
        query={viewMessagesQuery}
        variables={{ listingId }}
      >
        {({ data, loading, subscribeToMore }) => {
          let messages: ViewMessagesQuery_findMessages[] = [];

          if (data && !loading && data.findMessages) {
            messages = data.findMessages;
          }

          return children({
            messages,
            loading,
            subscribe: () =>
              subscribeToMore({
                document: newMessageSubscription,
                variables: { listingId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }

                  // update prev with new data
                  return {
                    ...prev,
                    findMessages: [
                      ...prev.findMessages,
                      (subscriptionData.data as any).newMessage,
                    ],
                  };
                },
              }),
          });
        }}
      </Query>
    );
  }
}
