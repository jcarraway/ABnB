import * as React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';

import { RegisterConnector } from '../modules/register/RegisterConnector';
import { LoginConnector } from '../modules/login/LoginConnector';
import { Me } from '../modules/me/Me';
import { CreateListingConnector } from '../modules/listing/create/CreateListingConnector';

export const Routes = () => (
  <NativeRouter initialEntries={['/create-listing']}>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/login" component={LoginConnector} />
      <Route exact={true} path="/me" component={Me} />
      <Route
        exact={true}
        path="/create-listing"
        component={CreateListingConnector}
      />
    </Switch>
  </NativeRouter>
);
