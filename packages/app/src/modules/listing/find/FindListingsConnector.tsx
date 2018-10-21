import * as React from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Card, Button, Slider } from 'react-native-elements';
import { SearchListings } from '@abb/controllers';

interface State {
  name: string;
  guests: number;
  beds: number;
}

export class FindListingsConnector extends React.PureComponent<{}, State> {
  state = {
    name: '',
    guests: 0,
    beds: 1,
  };

  render() {
    const { name, guests, beds } = this.state;
    return (
      <React.Fragment>
        <SafeAreaView />
        <TextInput
          style={{ width: 100, fontSize: 20 }}
          placeholder="search..."
          onChangeText={text => this.setState({ name: text })}
          value={name}
        />

        <View style={{ alignItems: 'stretch', justifyContent: 'center' }}>
          <Slider
            value={guests}
            onValueChange={value => this.setState({ guests: value })}
            step={1}
            // minimumValue={1}
            maximumValue={10}
          />
          <Text>Guests: {guests}</Text>
        </View>

        <View style={{ alignItems: 'stretch', justifyContent: 'center' }}>
          <Slider
            value={beds}
            onValueChange={value => this.setState({ beds: value })}
            step={1}
            minimumValue={1}
            maximumValue={10}
          />
          <Text>Beds: {beds}</Text>
        </View>

        <SearchListings
          variables={{ input: { name, guests, beds }, offset: 0, limit: 5 }}
        >
          {({ listings, hasMoreListings, loadMore }) => (
            <FlatList
              ListFooterComponent={() =>
                hasMoreListings ? (
                  <ActivityIndicator style={{ marginTop: 20 }} />
                ) : (
                  <View />
                )
              }
              onEndReachedThreshold={3}
              onEndReached={() => {
                console.log('end reached');
                loadMore();
                console.log('loading more data');
              }}
              data={listings}
              keyExtractor={({ id }) => `${id}-flc`}
              renderItem={({ item: l }) => (
                <Card
                  title={l.name}
                  image={l.pictureUrl ? { uri: l.pictureUrl } : undefined}
                >
                  <Text>{l.owner.email}</Text>
                  <Text>Beds: {l.beds}</Text>
                  <Text>Guests: {l.guests}</Text>
                  <Button title="See more" />
                </Card>
              )}
            />
          )}
        </SearchListings>
      </React.Fragment>
    );
  }
}
