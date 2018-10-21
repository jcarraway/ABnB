import * as React from 'react';
import { NativeRouter, Route, Switch, Link } from 'react-router-native';

import { RegisterConnector } from '../modules/register/RegisterConnector';
import { LoginConnector } from '../modules/login/LoginConnector';
import { Me } from '../modules/me/Me';
import { CreateListingConnector } from '../modules/listing/create/CreateListingConnector';
import { FindListingsConnector } from '../modules/listing/find/FindListingsConnector';
import { Icon } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';

export const Routes = () => (
  <NativeRouter initialEntries={['/listings']}>
    <Switch>
      <View style={{ flex: 1 }}>
        <Route exact={true} path="/register" component={RegisterConnector} />
        <Route exact={true} path="/login" component={LoginConnector} />
        <Route exact={true} path="/me" component={Me} />
        <Route
          exact={true}
          path="/create-listing"
          component={CreateListingConnector}
        />
        <Route
          exact={true}
          path="/listings"
          component={FindListingsConnector}
        />
        <View
          style={{
            height: 70,
            backgroundColor: 'black',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <Link component={TouchableOpacity} to="/listings">
            <Icon name="list" size={50} color="white" />
          </Link>
          <Link component={TouchableOpacity} to="/create-listing">
            <Icon name="add-circle" size={50} color="white" />
          </Link>
        </View>
      </View>
    </Switch>
  </NativeRouter>
);
