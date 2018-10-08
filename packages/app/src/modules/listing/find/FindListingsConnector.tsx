import * as React from 'react';
import { Text, ScrollView } from 'react-native';
import { withFindListings, WithFindListings } from '@abb/controllers';
import { Card, Button } from 'react-native-elements';

export class C extends React.PureComponent<WithFindListings> {
  render() {
    const { listings } = this.props;
    return (
      <ScrollView style={{ marginVertical: 20 }}>
        {listings.map(l => (
          <Card
            key={`${l.id}-flc`}
            title={l.name}
            image={l.pictureUrl ? { uri: l.pictureUrl } : undefined}
          >
            <Text>{l.owner.email}</Text>
            <Button title="See more" />
          </Card>
        ))}
      </ScrollView>
    );
  }
}

export const FindListingsConnector = withFindListings(C);
