import * as React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const SUB = gql`
  subscription {
    newMessage(listingId: "2199159b-ca46-4c9a-bb02-fe665ab0befa") {
      text
      user {
        email
        id
      }
      listingId
    }
  }
`;

export class TestSub extends React.PureComponent {
  render() {
    return (
      <Subscription subscription={SUB}>
        {data => {
          console.log(data);
          return null;
        }}
      </Subscription>
    );
  }
}
